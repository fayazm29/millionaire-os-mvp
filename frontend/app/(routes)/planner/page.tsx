'use client';
import { useState } from 'react';

export default function Planner() {
  const [doc, setDoc] = useState<any>({ outcomes: ['', '', ''], remove: '' });
  const [status, setStatus] = useState<string>('');

  // Placeholder until planner API is ready
  function onSave() {
    setStatus('Feature coming soon ⚙️');
    setTimeout(() => setStatus(''), 2000);
  }

  return (
    <div className="max-w-3xl mx-auto card p-6">
      <h1 className="text-2xl font-semibold mb-4">Weekly Planner (45 m)</h1>
      <label className="block text-sm text-muted mb-1">Top 3 Outcomes</label>
      {doc.outcomes.map((o: string, i: number) => (
        <input
          key={i}
          className="w-full border border-border rounded-xl p-2 mb-2"
          value={o}
          onChange={(e) => {
            const copy = [...doc.outcomes];
            copy[i] = e.target.value;
            setDoc({ ...doc, outcomes: copy });
          }}
          placeholder={`Outcome ${i + 1}`}
        />
      ))}

      <label className="block text-sm text-muted mt-3 mb-1">
        Remove / Automate
      </label>
      <textarea
        className="w-full border border-border rounded-xl p-2 h-24"
        value={doc.remove}
        onChange={(e) => setDoc({ ...doc, remove: e.target.value })}
        placeholder="What can I remove or automate?"
      />

      <div className="flex gap-3 mt-4">
        <button onClick={onSave} className="btn btn-primary">
          Save
        </button>
        <span className="text-sm text-muted">{status}</span>
      </div>

      <p className="text-muted text-sm mt-4">
        Planner saving will be available soon — you can still write and copy
        your outcomes manually for now.
      </p>
    </div>
  );
}
