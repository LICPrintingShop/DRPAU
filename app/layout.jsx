import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "DR PAU Client Support System",
  description: "Minimalist glass client support system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-bg">
          <div className="bg-orb orb-a" />
          <div className="bg-orb orb-b" />
          <div className="bg-orb orb-c" />
          <div className="bg-mesh" />
        </div>

        <header className="site-header">
          <nav className="glass-nav">
            <Link href="/" className="brand-wrap">
              <div className="brand-dot" />
              <div>
                <p className="brand-kicker">LIC PRINTING SHOP</p>
                <h1 className="brand-name">DR PAU</h1>
              </div>
            </Link>

            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/client" className="nav-link">Create Ticket</Link>
              <Link href="/track" className="nav-link">Track</Link>
              <Link href="/admin" className="nav-link">Admin</Link>
            </div>
          </nav>
        </header>

        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
