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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const text = `${ticket.ticketId} ${ticket.branch} ${ticket.type} ${ticket.concern} ${ticket.status} ${ticket.email || ""}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
  }, [tickets, query]);

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">ADMIN</p>
        <h1>Ticket Dashboard</h1>

        <input
          className="input"
          placeholder="Search ticket ID, status, concern, email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading ? (
          <p className="subtext">Loading tickets...</p>
        ) : (
          <AdminTicketTable tickets={filteredTickets} onRefresh={loadTickets} />
        )}
      </section>
    </main>
  );
}
