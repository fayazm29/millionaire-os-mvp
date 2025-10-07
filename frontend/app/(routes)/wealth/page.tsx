'use client';
import { useState } from 'react';

export default function Wealth() {
  const [status, setStatus] = useState('');

  function add() {
    setStatus('Feature coming soon ⚙️');
    setTimeout(() => setStatus(''), 2000);
  }

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold mb-3">Wealth — 10% First</h1>
      <p className="text-sm text-muted mb-4">
        Automatic income tracking and 10% savings logging will be available soon.
      </p>
      <button onClick={add} className="btn btn-primary">Add</button>
      <span className="text-sm text-muted ml-2">{status}</span>
    </div>
  );
}
