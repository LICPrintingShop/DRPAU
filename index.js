"use client"
import { useState } from "react"

export default function ClientAssistance() {
  const [device, setDevice] = useState("")
  const [type, setType] = useState("")
  const [concern, setConcern] = useState("")

  const concerns = [
    "COR (Certificate of Registration) - BIR",
    "Receipt Need ATP",
    "Books of Accounts",
    "Mayor's Permit",
    "Withholding Tax / 2307",
    "Books",
    "Registration"
  ]

  return (
    <div style={styles.container}>
      <h1>Client Assistance Portal</h1>
      <p>Please select your device and concern.</p>

      {/* Device Selection */}
      <div style={styles.section}>
        <h3>Device Used</h3>
        <div style={styles.row}>
          <button
            style={device === "phone" ? styles.active : styles.button}
            onClick={() => setDevice("phone")}
          >
            📱 Phone
          </button>

          <button
            style={device === "desktop" ? styles.active : styles.button}
            onClick={() => setDevice("desktop")}
          >
            💻 Desktop
          </button>
        </div>
      </div>

      {/* Request Type */}
      <div style={styles.section}>
        <h3>Type of Request</h3>

        <button
          style={type === "problem" ? styles.active : styles.button}
          onClick={() => setType("problem")}
        >
          Problems
        </button>

        <button
          style={type === "inquiry" ? styles.active : styles.button}
          onClick={() => setType("inquiry")}
        >
          Inquiry
        </button>
      </div>

      {/* Concern Selection */}
      <div style={styles.section}>
        <h3>Select Your Concern</h3>

        {concerns.map((item) => (
          <button
            key={item}
            style={concern === item ? styles.active : styles.button}
            onClick={() => setConcern(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Result */}
      {concern && (
        <div style={styles.result}>
          <h4>Selected Information</h4>
          <p><strong>Device:</strong> {device}</p>
          <p><strong>Request Type:</strong> {type}</p>
          <p><strong>Concern:</strong> {concern}</p>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial",
    padding: "20px"
  },
  section: {
    marginTop: "25px"
  },
  row: {
    display: "flex",
    gap: "10px"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#3498db",
    color: "white",
    cursor: "pointer"
  },
  active: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#2ecc71",
    color: "white",
    cursor: "pointer"
  },
  result: {
    marginTop: "30px",
    padding: "15px",
    borderRadius: "6px",
    background: "#ecf0f1"
  }
}
