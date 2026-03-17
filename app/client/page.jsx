"use client";

import { useSearchParams } from "next/navigation";
import TicketForm from "../../components/TicketForm";

export default function ClientPage() {
  const searchParams = useSearchParams();
  const branch = searchParams.get("branch") || "108";

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">CLIENT PORTAL</p>
        <h1>Create a Support Ticket</h1>
        <p className="subtext">Selected Branch: {branch}</p>
        <TicketForm branch={branch} />
      </section>
    </main>
  );
}
