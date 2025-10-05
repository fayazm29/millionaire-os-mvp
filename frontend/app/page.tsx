'use client';
import { useEffect, useState } from "react";
import { getToday, getStats } from "../lib/api";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    getToday().then(setData);
    getStats().then(setStats);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="card p-6 lg:col-span-2">
        <h1 className="text-2xl font-semibold mb-2">Good day, Fayaz</h1>
        <p className="text-muted mb-4">Here’s your Millionaire OS control panel.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="text-sm text-muted">Morning Focus</div>
            <div className="text-lg">{data?.focus || "–"}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-muted">Fasting</div>
            <div className="text-lg">{stats?.fasting_hours_today ?? "–"} h</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-muted">10% Saved</div>
            <div className="text-lg">£{stats?.saved_this_week ?? 0}</div>
          </div>
        </div>
      </section>
      <aside className="card p-6">
        <h2 className="font-semibold mb-3">Streaks</h2>
        <ul className="space-y-2 text-sm">
          <li>5am Deep Work: <b>{stats?.streaks?.deepwork ?? 0}</b> days</li>
          <li>Fasting: <b>{stats?.streaks?.fasting ?? 0}</b> days</li>
          <li>Finance Friday: <b>{stats?.streaks?.finance ?? 0}</b> weeks</li>
        </ul>
      </aside>
    </div>
  );
}
