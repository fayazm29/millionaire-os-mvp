'use client';
import { useState } from 'react';

export default function Energy() {
  const [hours, setHours] = useState<number>(16);
  const [rows, setRows] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');

  // Placeholder until fasting API is reconnected
  function add() {
    setStatus('Feature coming soon ⚙️');
    setTimeout(() => setStatus(''), 2000);
  }

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold mb-3">Energy — Fasting Log</h1>
      <div className="flex gap-2">
        <input
          type="number"
          className="border border-border rounded-xl p-2"
          value={hours}
          onChange={(e) => setHours(parseFloat(e.target.value))}
          placeholder="Hours fasted"
        />
        <button onClick={add} className="btn btn-primary">
          Add
        </button>
        <span className="text-sm text-muted">{status}</span>
      </div>

      <p className="text-muted text-sm mt-4">
        Fasting tracker coming soon — this will log your daily fasting hours
        automatically once connected to the backend.
      </p>
    </div>
  );
}
