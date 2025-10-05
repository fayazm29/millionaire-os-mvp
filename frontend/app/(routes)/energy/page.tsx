'use client';
import { useEffect, useState } from 'react';
import { getFasting, addFast } from '../../../lib/api';

export default function Energy(){
  const [hours, setHours] = useState<number>(16);
  const [rows, setRows] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect(()=>{ getFasting().then(setRows); }, []);

  function add(){
    addFast(hours).then(r=>{ setRows(r); setStatus('Logged ✓'); setTimeout(()=>setStatus(''), 1200); });
  }

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold mb-3">Energy — Fasting Log</h1>
      <div className="flex gap-2">
        <input type="number" className="border border-border rounded-xl p-2" value={hours} onChange={e=> setHours(parseFloat(e.target.value))} placeholder="Hours fasted" />
        <button onClick={add} className="btn btn-primary">Add</button>
        <span className="text-sm text-muted">{status}</span>
      </div>
      <table className="w-full text-sm mt-4">
        <thead><tr className="text-left text-muted"><th className="py-2">Date</th><th>Hours</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="border-t border-border">
              <td className="py-2">{r.date}</td>
              <td>{r.hours} h</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
