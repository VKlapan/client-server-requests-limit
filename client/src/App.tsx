import { useState } from 'react';
import { runWorkers } from './utils/workers';

const TOTAL_REQUESTS = 1000;

export default function App() {
  const [limit, setLimit] = useState(10);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const start = async () => {
    setRunning(true);
    setResults([]);

    await runWorkers({
      total: TOTAL_REQUESTS,
      concurrency: limit,
      onResult: (index) => {
        setResults((prev) => [...prev, index]);
      },
      onError: console.error,
    });

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
