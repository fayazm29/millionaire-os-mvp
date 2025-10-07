'use client';

export default function SettingsPage() {
  const isProd = process.env.NODE_ENV === 'production';
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {isProd ? (
        <p className="text-gray-600">
          Environment variables are securely configured.
        </p>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Add your API keys and preferences via environment variables.
          </p>
          <code className="bg-gray-100 p-2 rounded text-sm">
            NEXT_PUBLIC_API_BASE={apiBase}
          </code>
        </>
      )}

      <footer className="mt-12 text-gray-400 text-sm">
        © 2025 Millionaire OS
      </footer>
    </main>
  );
}
