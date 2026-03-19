"use client";

import { useState } from "react";

export default function TicketStatusLookup() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookupTicket(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTicket(null);

    try {
      const res = await fetch(`/api/tickets/${ticketId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ticket not found");
      setTicket(data.ticket);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={lookupTicket} className="form-inline">
        <input
          className="glass-input"
          placeholder="Enter ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          {loading ? "Checking..." : "Check Status"}
        </button>
      </form>

      {error ? <p className="error-text">{error}</p> : null}

      {ticket ? (
        <div className="glass-panel" style={{ marginTop: 16 }}>
          <h2>{ticket.ticketId}</h2>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Branch:</strong> {ticket.branch}</p>
          <p><strong>Type:</strong> {ticket.type}</p>
          <p><strong>Concern:</strong> {ticket.concern}</p>
          <p><strong>Remarks:</strong> {ticket.remarks || "No remarks yet"}</p>
          <p><strong>Created:</strong> {ticket.createdAt}</p>
        </div>
      ) : null}
    </>
  );
}
