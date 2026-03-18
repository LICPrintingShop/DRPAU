import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <div className="bg-grid" />

      <section className="landing-hero">
        <div className="hero-badge">LIC PRINTING SHOP</div>

        <h1 className="hero-title">
          DR PAU
          <span> Client Support System</span>
        </h1>

        <p className="hero-text">
          A clean and modern way to submit concerns, track requests, and manage
          client support across branches.
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

      <section className="floating-panels">
        <div className="info-card float-slow">
          <p className="info-label">Support</p>
          <h3>Fast Request Submission</h3>
          <p>
            Clients can submit concerns quickly with structured address and
            contact details.
          </p>
        </div>

        <div className="info-card float-delay">
          <p className="info-label">Tracking</p>
          <h3>Real-Time Ticket Lookup</h3>
          <p>
            Check status updates, routing progress, and remarks using a ticket
            ID.
          </p>
        </div>

        <div className="info-card float-fast">
          <p className="info-label">Admin</p>
          <h3>Manual Branch Review</h3>
          <p>
            Employees can search, review, and assign the correct branch based on
            actual handling.
          </p>
        </div>
      </section>
    </main>
  );
}
