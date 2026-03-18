import Link from "next/link";

export default function Home() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <div className="glass-hero">
          <p className="section-kicker">CLIENT SUPPORT SYSTEM</p>
          <h2 className="hero-title">
            Minimal support,
            <span> modern workflow.</span>
          </h2>
          <p className="hero-text">
            Submit concerns, track requests, and manage routing in a clean
            colorful glass interface built for client support.
          </p>

          <div className="hero-actions">
            <Link href="/client" className="btn-primary">
              Create Ticket
            </Link>
            <Link href="/track" className="btn-secondary">
              Track Ticket
            </Link>
            <Link href="/admin" className="btn-secondary">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="glass-card idle-float">
          <p className="card-label">Submission</p>
          <h3>Structured Client Requests</h3>
          <p>
            Clean forms with address selection, contact details, and concern
            tracking.
          </p>
        </div>

        <div className="glass-card idle-float delay-1">
          <p className="card-label">Tracking</p>
          <h3>Simple Ticket Lookup</h3>
          <p>
            Clients can check progress, remarks, and status using a single
            ticket ID.
          </p>
        </div>

        <div className="glass-card idle-float delay-2">
          <p className="card-label">Review</p>
          <h3>Employee Branch Review</h3>
          <p>
            Employees search address, contact, and request details before
            assigning the correct branch.
          </p>
        </div>
      </section>
    </main>
  );
}
