'use client';
import { useEffect, useState } from 'react';
import { askCoach } from '../../../lib/api';

export default function Coach(){
  const [q, setQ] = useState<string>("What would Millionaire Fayaz do next?");
  const [a, setA] = useState<string>("");

  function ask(){ askCoach(q).then(setA); }

  return (
    <div className="card p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">AI Coach — Future Fayaz</h1>
      <p className="text-muted mb-4">Identity-aligned prompts to keep you on track.</p>
      <textarea className="w-full border border-border rounded-xl p-2 h-28" value={q} onChange={e=> setQ(e.target.value)} />
      <div className="mt-3"><button onClick={ask} className="btn btn-primary">Ask</button></div>
      <div className="mt-4 whitespace-pre-wrap">{a}</div>
    </div>
  )
}
