"use client";

import TicketStatusLookup from "../../components/TicketStatusLookup";

export default function TrackPage() {
  return (
    <div className="page-container">
      <section className="glass-panel">
        <p className="section-kicker">TRACKING</p>
        <h2>Track Your Ticket</h2>
        <p className="subtext">Enter your ticket ID to view status updates.</p>
        <TicketStatusLookup />
      </section>
    </div>
  );
}
