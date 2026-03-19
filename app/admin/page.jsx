"use client";

import { useEffect, useState } from "react";
import AdminTicketTable from "../../components/AdminTicketTable";

export default function AdminPage() {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTickets(search = "") {
    setLoading(true);
    try {
      const url = search
        ? `/api/tickets?q=${encodeURIComponent(search)}`
        : "/api/tickets";

      const res = await fetch(url);
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error(error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin-login";
  }

  useEffect(() => {
    loadTickets(query);
  }, [query]);

  return (
    <div className="page-container">
      <section className="glass-panel">
        <p className="section-kicker">ADMIN</p>
        <h2>Ticket Dashboard</h2>

        <div className="toolbar">
          <p className="subtext">Search and review tickets.</p>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <input
          className="glass-input"
          placeholder="Search ticket, contact, address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div style={{ height: 16 }} />

        {loading ? (
          <p className="subtext">Loading tickets...</p>
        ) : (
          <AdminTicketTable tickets={tickets} onRefresh={() => loadTickets(query)} />
        )}
      </section>
    </div>
  );
}
