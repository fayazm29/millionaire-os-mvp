import "../styles/globals.css";
export const metadata = { title: "Millionaire OS", description: "AI-Powered Website Revitalisation for your life" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="bg-white border-b border-border">
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary" />
              <span className="font-semibold">ONE REFRESH</span>
              <span className="text-muted hidden md:inline">· AI-Powered Website Revitalisation</span>
            </div>
            <nav className="flex gap-3 text-sm">
              <a href="/" className="hover:underline">Dashboard</a>
              <a href="/planner" className="hover:underline">Planner</a>
              <a href="/wealth" className="hover:underline">Wealth</a>
              <a href="/energy" className="hover:underline">Energy</a>
              <a href="/coach" className="hover:underline">AI Coach</a>
              {process.env.NODE_ENV !== "production" && (<a href="/settings" className="hover:underline">Settings</a>)}
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-10 text-center text-sm text-muted">
          © 2025 One Refresh · Millionaire OS
        </footer>
      </body>
    </html>
  );
}
