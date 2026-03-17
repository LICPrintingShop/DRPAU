"use client";

import { useState } from "react";

const statuses = [
  "Received",
  "For Checking",
  "Processing",
  "Ready for Release",
  "Completed"
];

export default function AdminTicketTable({ tickets, onRefresh }) {
  const [savingId, setSavingId] = useState("");

  async function updateTicket(ticketId, status, remarks) {
    setSavingId(ticketId);

    try {
      await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status, remarks })
      });

      await onRefresh();
    } catch (error) {
      console.error(error);
    } finally {
      setSavingId("");
    }
  }

  if (!tickets.length) {
    return <p className="subtext">No tickets found.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Branch</th>
            <th>Type</th>
            <th>Concern</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.ticketId}
              ticket={ticket}
              statuses={statuses}
              onSave={updateTicket}
              saving={savingId === ticket.ticketId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TicketRow({ ticket, statuses, onSave, saving }) {
  const [status, setStatus] = useState(ticket.status || "Received");
  const [remarks, setRemarks] = useState(ticket.remarks || "");

  return (
    <tr>
      <td>{ticket.ticketId}</td>
      <td>{ticket.branch}</td>
      <td>{ticket.type}</td>
      <td>{ticket.concern}</td>
      <td>
        <select
          className="table-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          className="table-input"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add remarks"
        />
      </td>
      <td>
        <button
          className="secondary-btn"
          onClick={() => onSave(ticket.ticketId, status, remarks)}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </td>
    </tr>
  );
}
