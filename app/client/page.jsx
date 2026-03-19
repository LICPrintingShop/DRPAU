"use client";

import TicketForm from "../../components/TicketForm";

export default function ClientPage() {
  return (
    <div className="page-container">
      <section className="glass-panel">
        <p className="section-kicker">CLIENT PORTAL</p>
        <h2>Create a Support Ticket</h2>
        <p className="subtext">
          Fill out the form and your request will be reviewed by the team.
        </p>
        <TicketForm />
      </section>
    </div>
  );
}
