"use client";

import { useMemo, useState } from "react";

const concernOptions = {
  problem: [
    "Delayed order",
    "Wrong details on print",
    "Missing booklet",
    "Duplicate release issue",
    "Other printing issue"
  ],
  inquiry: [
    "Order status inquiry",
    "Claiming schedule",
    "Requirements inquiry",
    "Price inquiry",
    "Other inquiry"
  ]
};

const addressData = {
  NCR: {
    "Metro Manila": {
      Manila: ["Barangay 1", "Barangay 2"],
      "Quezon City": ["Bagumbayan", "Commonwealth"],
      Pasig: ["San Antonio", "Ugong"]
    }
  },
  "Region IV-A": {
    Rizal: {
      Antipolo: ["San Jose", "Dela Paz"],
      Taytay: ["Dolores", "San Juan"],
      Cainta: ["San Andres", "Sto. Domingo"]
    },
    Laguna: {
      Calamba: ["Real", "Canlubang"],
      "Santa Rosa": ["Balibago", "Tagapo"]
    },
    Cavite: {
      Imus: ["Alapan", "Bucandala"],
      Bacoor: ["Molino 1", "Talaba"]
    }
  },
  "Region III": {
    Bulacan: {
      Malolos: ["Santo Rosario", "San Pablo"],
      Meycauayan: ["Camalig", "Perez"]
    }
  }
};

export default function TicketForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [addressMode, setAddressMode] = useState("dropdown");

  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [manualAddress, setManualAddress] = useState("");

  const [type, setType] = useState("");
  const [concern, setConcern] = useState("");
  const [details, setDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const concerns = useMemo(() => concernOptions[type] || [], [type]);

  const regionOptions = Object.keys(addressData);
  const provinceOptions = region ? Object.keys(addressData[region] || {}) : [];
  const cityOptions =
    region && province ? Object.keys(addressData[region]?.[province] || {}) : [];
  const barangayOptions =
    region && province && city
      ? addressData[region]?.[province]?.[city] || []
      : [];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          contactPerson,
          contactNumber,
          addressMode,
          region,
          province,
          city,
          barangay,
          manualAddress,
          type,
          concern,
          details
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create ticket");
      }

      setTicket(data.ticket);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (ticket) {
    return (
      <div className="glass-panel">
        <h2>Ticket Submitted</h2>
        <p className="subtext">Your request has been received.</p>
        <div className="ticket-box">{ticket.ticketId}</div>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Branch Status:</strong> {ticket.branch}</p>
        <p><strong>Contact Person:</strong> {ticket.contactPerson}</p>
        <p><strong>Contact Number:</strong> {ticket.contactNumber}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-form form-grid">
      <input
        className="glass-input"
        placeholder="Client name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="glass-input"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="glass-input"
        placeholder="Contact person"
        value={contactPerson}
        onChange={(e) => setContactPerson(e.target.value)}
      />

      <input
        className="glass-input"
        placeholder="Contact number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />

      <select
        className="glass-select"
        value={addressMode}
        onChange={(e) => setAddressMode(e.target.value)}
      >
        <option value="dropdown">Select address from dropdown</option>
        <option value="manual">Address not in list</option>
      </select>

      {addressMode === "dropdown" ? (
        <>
          <select
            className="glass-select"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setProvince("");
              setCity("");
              setBarangay("");
            }}
          >
            <option value="">Select region</option>
            {regionOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="glass-select"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setCity("");
              setBarangay("");
            }}
            disabled={!region}
          >
            <option value="">Select province</option>
            {provinceOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="glass-select"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setBarangay("");
            }}
            disabled={!province}
          >
            <option value="">Select city / municipality</option>
            {cityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="glass-select"
            value={barangay}
            onChange={(e) => setBarangay(e.target.value)}
            disabled={!city}
          >
            <option value="">Select barangay</option>
            {barangayOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </>
      ) : (
        <textarea
          className="glass-textarea"
          placeholder="Enter full address"
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
        />
      )}

      <select
        className="glass-select"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setConcern("");
        }}
      >
        <option value="">Select request type</option>
        <option value="problem">Problem</option>
        <option value="inquiry">Inquiry</option>
      </select>

      <select
        className="glass-select"
        value={concern}
        onChange={(e) => setConcern(e.target.value)}
        disabled={!type}
      >
        <option value="">Select concern</option>
        {concerns.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <textarea
        className="glass-textarea"
        placeholder="Additional details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      {error ? <p className="error-text">{error}</p> : null}

      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  );
}
