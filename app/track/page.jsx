"use client";

import TicketStatusLookup from "../../components/TicketStatusLookup";

export default function TrackPage() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">TRACKING</p>
        <h1>Track Your Ticket</h1>
        <p className="subtext">
          Enter your ticket ID to view the latest status and remarks.
        </p>
        <TicketStatusLookup />
      </section>
    </main>
  );
}
