export const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function getToday(){ const r = await fetch(`${API}/today`); return r.json(); }
export async function getStats(){ const r = await fetch(`${API}/stats`); return r.json(); }

export async function getPlanner(){ const r = await fetch(`${API}/planner`); return r.json(); }
export async function savePlanner(doc:any){ const r = await fetch(`${API}/planner`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(doc) }); return r.json(); }

export async function getFinance(){ const r = await fetch(`${API}/finance`); return r.json(); }
export async function addIncome(amount:number){ const r = await fetch(`${API}/finance`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ income: amount }) }); return r.json(); }

export async function getFasting(){ const r = await fetch(`${API}/fasting`); return r.json(); }
export async function addFast(hours:number){ const r = await fetch(`${API}/fasting`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ hours }) }); return r.json(); }

export async function askCoach(prompt:string){ const r = await fetch(`${API}/coach`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ prompt }) }); return r.text(); }
