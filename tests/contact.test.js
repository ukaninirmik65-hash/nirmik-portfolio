import test from "node:test";
import assert from "node:assert/strict";
import { emptyInquiry } from "../src/data/inquiry.js";
import { validateContact } from "../src/utils/inquiry.js";
import { buildSubmission } from "../src/utils/web3forms.js";
const client = { ...emptyInquiry, name: "Test Client", email: "client@example.com", service: "react", message: "I need a responsive React website for my business." };
test("contact essentials can submit without optional project details", () => {
  assert.deepEqual(validateContact(client), {});
  const data = buildSubmission(client, "mock-key-for-unit-tests-only");
  assert.equal(data.get("replyto"), client.email);
  assert.equal(data.get("number_of_pages"), "Not specified");
  assert.equal(data.get("project_timeline"), "Not specified");
  assert.ok(data.get("subject").includes(client.name));
});
test("contact rejects invalid optional details without requiring them", () => {
  const errors = validateContact({ ...client, pages: "wrong", duration: "wrong", phone: "invalid", website: "javascript:alert(1)" });
  for (const name of ["pages", "duration", "phone", "website"]) assert.ok(errors[name]);
  assert.deepEqual(validateContact({ ...client, pages: "4-5", duration: "flexible" }), {});
});
test("contact still validates each essential field", () => {
  const errors = validateContact(emptyInquiry);
  assert.deepEqual(Object.keys(errors).sort(), ["email", "message", "name", "service"]);
});
