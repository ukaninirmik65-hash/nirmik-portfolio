// Browser-only test fixture. Not imported by the site or production build.
// This never contacts Web3Forms and cannot deliver email.
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import InquiryForm from "../../src/components/InquiryForm.jsx";
import "../../src/styles/index.css";

function Fixture() {
  const [service, setService] = useState("");
  const [mode, setMode] = useState("error");
  const [calls, setCalls] = useState(0);
  const [snapshot, setSnapshot] = useState("");
  const sendInquiry = async (values) => {
    setCalls((count) => count + 1);
    setSnapshot(JSON.stringify(values));
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (mode === "error")
      throw new Error("Mock API error — input must remain.");
    return { success: mode === "success" };
  };
  return (
    <main className="wrap" style={{ maxWidth: 650, paddingBlock: 30 }}>
      <h1 style={{ fontSize: 26 }}>MOCK UI CHECK — NO EMAIL IS SENT</h1>
      <p>This fixture is excluded from the production build.</p>
      <label htmlFor="mock-mode">Mock response</label>
      <select
        id="mock-mode"
        value={mode}
        onChange={(event) => setMode(event.target.value)}
      >
        <option value="error">Error</option>
        <option value="success">Success</option><option value="unconfirmed">Unconfirmed response</option>
      </select>
      <p>
        Requests: <output aria-label="Request count">{calls}</output>
      </p>
      <details>
        <summary>Captured fields</summary>
        <pre style={{ whiteSpace: "pre-wrap" }}>{snapshot}</pre>
      </details>
      <InquiryForm
        service={service}
        onServiceChange={setService}
        sendInquiry={sendInquiry}
      />
    </main>
  );
}
createRoot(document.getElementById("root")).render(<Fixture />);
