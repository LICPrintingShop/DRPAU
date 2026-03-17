import Link from "next/link";

const branches = [83, 93, 97, 108, 115, 117, 118, 120];

export default function Home() {
  return (
    <main className="page">
      <section className="hero-card">
        <p className="eyebrow">LIC PRINTING SHOP</p>
        <h1>DR PAU Client Support System</h1>
        <p className="subtext">
          Submit concerns, track ticket progress, and manage updates in one
          clean system.
        </p>

        <div className="hero-actions">
          <Link href="/client" className="primary-btn">
            Create Ticket
          </Link>
          <Link href="/track" className="secondary-btn">
            Track Ticket
          </Link>
          <Link href="/admin" className="secondary-btn">
            Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="card">
        <h2>Select Branch</h2>
        <div className="branch-grid">
          {branches.map((branch) => (
            <Link
              key={branch}
              href={`/client?branch=${branch}`}
              className="branch-card"
            >
              Branch {branch}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
