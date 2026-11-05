// Browser-only test fixture. Not imported by the site or production build.
// This never contacts Web3Forms and cannot deliver email.
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import InquiryForm from "../../src/components/InquiryForm.jsx";
import { submitToWeb3Forms } from "../../src/utils/web3forms.js";
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
    if (mode === "network") return submitToWeb3Forms(values, { accessKey: "mock-only", fetchImpl: async () => { throw new TypeError("Failed to fetch"); } });
    if (mode === "timeout") return submitToWeb3Forms(values, { accessKey: "mock-only", timeoutMs: 30, fetchImpl: (_, { signal }) => new Promise((_, reject) => signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true })) });
    if (mode === "http") return submitToWeb3Forms(values, { accessKey: "mock-only", fetchImpl: async () => ({ ok: false, json: async () => ({ success: true, message: "Mock HTTP 500" }) }) });
    if (mode === "html-error") throw new Error("<img src=x onerror=alert(1)> Mock error text");
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
        <option value="network">Network failure</option>
        <option value="timeout">Timeout</option>
        <option value="http">HTTP failure</option>
        <option value="html-error">HTML error text</option>
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
      <button type="button" onClick={() => setService("react")}>Simulate service-card selection</button>
      <InquiryForm
        service={service}
        onServiceChange={setService}
        sendInquiry={sendInquiry}
      />
    </main>
  );
}
createRoot(document.getElementById("root")).render(<Fixture />);
