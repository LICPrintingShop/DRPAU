"use client";

import { useState } from "react";

const statuses = [
  "Received",
  "For Checking",
  "Processing",
  "Ready for Release",
  "Completed",
];

export default function AdminTicketTable({ tickets, onRefresh }) {
  const [savingId, setSavingId] = useState("");

  async function updateTicket(ticketId, status, remarks, branch) {
    setSavingId(ticketId);

    try {
      await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, remarks, branch }),
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
    <div className="glass-table-wrap table-wrap">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
            <th>Address</th>
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
  const [branch, setBranch] = useState(ticket.branch || "UNASSIGNED");

  const address =
    ticket.addressMode === "dropdown"
      ? [ticket.region, ticket.province, ticket.city, ticket.barangay]
          .filter(Boolean)
          .join(", ")
      : ticket.manualAddress || "-";

  return (
    <tr>
      <td>{ticket.ticketId}</td>
      <td>{ticket.contactPerson || "-"}</td>
      <td>{ticket.contactNumber || "-"}</td>
      <td>{address}</td>
      <td>
        <input
          className="table-input"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Assign branch"
        />
      </td>
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
          className="btn-secondary"
          onClick={() => onSave(ticket.ticketId, status, remarks, branch)}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </td>
    </tr>
  );
}
