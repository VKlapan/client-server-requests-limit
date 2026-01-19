type WorkerOptions = {
  total: number;
  concurrency: number;
  onResult: (index: number) => void;
  onError?: (err: unknown) => void;
};

export async function runWorkers({
  total,
  concurrency,
  onResult,
  onError,
}: WorkerOptions): Promise<void> {
  const queue: number[] = Array.from(
    { length: total },
    (_, i) => i + 1,
  );

  let tokens = concurrency;
  const waiters: Array<() => void> = [];

  const takeToken = async () => {
    if (tokens > 0) {
      tokens--;
      return;
    }

    await new Promise<void>((resolve) => {
      waiters.push(resolve);
    });
  };

  const refill = setInterval(() => {
    const canAdd = concurrency - tokens;
    if (canAdd <= 0) return;

    tokens += canAdd;

    while (tokens > 0 && waiters.length > 0) {
      tokens--;
      const resolve = waiters.shift();
      resolve?.();
    }
  }, 1000);

  const worker = async () => {
    while (queue.length > 0) {
      await takeToken();

      const index = queue.shift();
      if (index === undefined) return;

      try {
        const res = await fetch(`/api?index=${index}`);

        if (!res.ok) {
          if (res.status === 429) {
            await new Promise(r => setTimeout(r, 200));
            queue.unshift(index);
          }
          continue;
        }

        const data: { index: number } = await res.json();
        onResult(data.index);
      } catch (err) {
        onError?.(err);
      }
    }
  };

  await Promise.all(
    Array.from({ length: concurrency }, () => worker()),
  );

  clearInterval(refill);
}
