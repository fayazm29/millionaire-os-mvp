export default function Settings(){
  return (
    <div className="card p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Settings</h1>
      <p className="text-muted">Add your API keys and preferences via environment variables.</p>
      <pre className="bg-soft p-3 rounded-xl mt-3 text-sm">
NEXT_PUBLIC_API_BASE=http://localhost:8000
      </pre>
    </div>
  )
}
