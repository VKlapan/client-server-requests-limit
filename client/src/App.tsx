import { useState } from 'react';

const TOTAL_REQUESTS = 1000;

export default function App() {
  const [limit, setLimit] = useState(10);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const start = async () => {
    setRunning(true);
    setResults([]);

    const queue: number[] = Array.from(
      { length: TOTAL_REQUESTS },
      (_, i) => i + 1,
    );

    let tokens = limit;
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
      const canAdd = limit - tokens;
      if (canAdd <= 0) return;

      tokens += canAdd;

      while (tokens > 0 && waiters.length > 0) {
        tokens--;
        const resolve = waiters.shift();
        if (resolve) resolve();
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
              continue;
            }
            continue;
          }

          const data: { index: number } = await res.json();
          console.log(data);

          setResults((prev) => [...prev, data.index]);
        } catch (err) {
          console.error(err);
        }
      }
    };

    await Promise.all(
      Array.from({ length: limit }, () => worker()),
    );

    clearInterval(refill);
    setRunning(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="number"
        min={0}
        max={100}
        required
        value={limit}
        disabled={running}
        onChange={(e) => setLimit(Number(e.target.value))}
      />

      <button disabled={running} onClick={start}>
        Start
      </button>

      <ul>
        {results.map((i) => (
          <li key={i}>Response index: {i}</li>
        ))}
      </ul>
    </div>
  );
}
