"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTicketTable from "../../components/AdminTicketTable";

export default function AdminPage() {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTickets() {
    setLoading(true);
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error(error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    const q = query.toLowerCase();

    return tickets.filter((ticket) => {
      const text = `
        ${ticket.ticketId || ""}
        ${ticket.branch || ""}
        ${ticket.type || ""}
        ${ticket.concern || ""}
        ${ticket.status || ""}
        ${ticket.email || ""}
        ${ticket.contactPerson || ""}
        ${ticket.contactNumber || ""}
        ${ticket.region || ""}
        ${ticket.province || ""}
        ${ticket.city || ""}
        ${ticket.barangay || ""}
        ${ticket.manualAddress || ""}
      `.toLowerCase();

      return text.includes(q);
    });
  }, [tickets, query]);

  return (
    <main className="page-container">
      <section className="glass-panel">
        <p className="section-kicker">ADMIN</p>
        <h2>Ticket Dashboard</h2>
        <p className="subtext">
          Search and review tickets before assigning the correct branch.
        </p>

        <input
          className="glass-input"
          placeholder="Search ticket ID, contact, address, concern..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div style={{ height: 16 }} />

        {loading ? (
          <p className="subtext">Loading tickets...</p>
        ) : (
          <AdminTicketTable tickets={filteredTickets} onRefresh={loadTickets} />
        )}
      </section>
    </main>
  );
}
