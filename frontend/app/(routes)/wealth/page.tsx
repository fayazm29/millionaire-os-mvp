'use client';
import { useEffect, useState } from 'react';
import { getFinance, addIncome } from '../../../lib/api';

export default function Wealth(){
  const [rows, setRows] = useState<any[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [status, setStatus] = useState<string>('');

  useEffect(()=>{ getFinance().then(setRows); }, []);

  function add(){
    addIncome(income).then(r=>{
      setRows(r); setIncome(0); setStatus('Logged ✓'); setTimeout(()=>setStatus(''), 1200);
    });
  }

  const saved = rows.reduce((a,r)=> a + (r.saved || 0), 0);

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold mb-3">Wealth — 10% First</h1>
      <div className="flex gap-2">
        <input type="number" className="border border-border rounded-xl p-2" value={income} onChange={e=> setIncome(parseFloat(e.target.value))} placeholder="Income £" />
        <button onClick={add} className="btn btn-primary">Add</button>
        <span className="text-sm text-muted">{status}</span>
      </div>
      <div className="mt-4 text-sm">Total saved to Freedom Account: <b>£{saved.toFixed(2)}</b></div>
      <table className="w-full text-sm mt-4">
        <thead><tr className="text-left text-muted"><th className="py-2">Date</th><th>Income</th><th>Saved (10%)</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="border-t border-border">
              <td className="py-2">{r.date}</td>
              <td>£{r.income}</td>
              <td>£{r.saved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
