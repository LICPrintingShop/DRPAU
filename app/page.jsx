import Link from "next/link";

export default function Home() {
  return (
    <div className="page-container">
      <section className="glass-hero">
        <p className="section-kicker">CLIENT SUPPORT SYSTEM</p>
        <h2 className="hero-title">
          Minimal support,
          <span> modern workflow.</span>
        </h2>
        <p className="hero-text">
          Submit concerns, track requests, and manage routing in a clean
          colorful glass interface.
        </p>

        <div className="hero-actions">
          <Link href="/client" className="btn-primary">Create Ticket</Link>
          <Link href="/track" className="btn-secondary">Track Ticket</Link>
          <Link href="/admin" className="btn-secondary">Admin Dashboard</Link>
        </div>
      </section>

      <section className="feature-grid">
        <div className="glass-card">
          <p className="card-label">Submission</p>
          <h3>Structured Client Requests</h3>
          <p>Clients can submit concerns with contact and address details.</p>
        </div>

        <div className="glass-card">
          <p className="card-label">Tracking</p>
          <h3>Ticket Lookup</h3>
          <p>Clients can track requests using their ticket ID.</p>
        </div>

        <div className="glass-card">
          <p className="card-label">Admin</p>
          <h3>Branch Review</h3>
          <p>Employees can search, review, and assign the correct branch.</p>
        </div>
      </section>
    </div>
  );
}
