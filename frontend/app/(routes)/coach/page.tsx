'use client';
import { useState } from "react";
import { askCoach } from "@/lib/api";

export default function CoachPage() {
  const [userName, setUserName] = useState("Fayaz");
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await askCoach(userName, prompt);
      setReply(res.reply);
    } catch (err) {
      console.error(err);
      setReply("Sorry, I couldn’t reach the coach right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">AI Success Coach</h1>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <textarea
        className="border p-2 rounded w-full h-24 mb-3"
        placeholder="Ask your coach anything…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading || !prompt}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
      >
        {loading ? "Thinking…" : "Ask Coach"}
      </button>

      {reply && (
        <div className="mt-6 bg-gray-50 border p-4 rounded text-left">
          <b>Coach:</b> {reply}
        </div>
      )}
    </main>
  );
}
