import test from "node:test";
import assert from "node:assert/strict";
import { emptyInquiry, featureOptions } from "../src/data/inquiry.js";
import { buildSubmission, submitToWeb3Forms } from "../src/utils/web3forms.js";
import {
  WEB3FORMS_ENDPOINT,
  hasWeb3FormsAccessKey,
} from "../src/config/web3forms.js";
import { validateInquiry } from "../src/utils/inquiry.js";

// These identifiers are only passed to injected mocks. No real key or live
// network request is used by this test suite.
const mockKey = "mock-key-for-unit-tests-only";
const values = {
  ...emptyInquiry,
  name: "Test Client",
  email: "client@example.com",
  phone: "+91 90000 00000",
  company: "Example Studio",
  service: "react",
  pages: "4-5",
  duration: "3-4-weeks",
  design: "figma",
  website: "https://example.com",
  features: [...featureOptions],
  message: "A responsive React website with API integration.",
};

test("serializes every control, readable choices, all features, and Reply-To", () => {
  const data = buildSubmission(values, mockKey);
  assert.ok(data instanceof FormData);
  for (const name of [
    "name",
    "email",
    "phone",
    "company",
    "service",
    "pages",
    "duration",
    "design",
    "website",
    "message",
  ])
    assert.equal(data.get(name), values[name]);
  assert.equal(data.get("replyto"), values.email);
  assert.equal(data.get("number_of_pages"), "4–5 pages");
  assert.equal(data.get("project_timeline"), "Within 3–4 weeks");
  assert.equal(data.get("project_type"), "React.js development");
  featureOptions.forEach((feature, index) =>
    assert.equal(data.get(`feature_${index + 1}`), `${feature}: Yes`),
  );
  assert.equal(data.get("features"), featureOptions.join(", "));
  assert.equal(data.get("botcheck"), null);
  assert.ok(
    ![...data.keys()].some((key) => /price|rate|budget|cost/.test(key)),
  );
});
test("optional phone is validated without adding a required field", () => {
  assert.deepEqual(validateInquiry({ ...values, phone: "" }), {});
  assert.deepEqual(validateInquiry(values), {});
  assert.ok(validateInquiry({ ...values, phone: "not a phone" }).phone);
  assert.ok(validateInquiry({ ...values, phone: "123" }).phone);
});
test("posts FormData to the official endpoint with Accept JSON", async () => {
  const before = JSON.stringify(values);
  let requests = 0;
  const result = await submitToWeb3Forms(values, {
    accessKey: mockKey,
    fetchImpl: async (url, options) => {
      requests++;
      assert.equal(url, WEB3FORMS_ENDPOINT);
      assert.equal(url, "https://api.web3forms.com/submit");
      assert.equal(options.method, "POST");
      assert.deepEqual(options.headers, { Accept: "application/json" });
      assert.ok(options.body instanceof FormData);
      assert.equal(options.body.get("access_key"), mockKey);
      assert.equal(options.body.get("replyto"), "client@example.com");
      return {
        ok: true,
        json: async () => ({ success: true, message: "Test acceptance" }),
      };
    },
  });
  assert.equal(requests, 1);
  assert.equal(result.success, true);
  assert.equal(JSON.stringify(values), before);
});
test("missing/placeholder keys and honeypot never make a request", async () => {
  let called = false;
  const fetchImpl = async () => {
    called = true;
  };
  for (const accessKey of ["", "YOUR_WEB3FORMS_ACCESS_KEY"])
    await assert.rejects(
      submitToWeb3Forms(values, { accessKey, fetchImpl }),
      /not configured/,
    );
  await assert.rejects(
    submitToWeb3Forms(values, {
      accessKey: mockKey,
      botcheck: true,
      fetchImpl,
    }),
    /Unable to send/,
  );
  assert.equal(called, false);
  assert.equal(hasWeb3FormsAccessKey("YOUR_WEB3FORMS_ACCESS_KEY"), false);
});
test("API and HTTP errors never count as success", async () => {
  const before = JSON.stringify(values);
  await assert.rejects(
    submitToWeb3Forms(values, {
      accessKey: mockKey,
      fetchImpl: async () => ({
        ok: true,
        json: async () => ({ success: false, message: "Please try later" }),
      }),
    }),
    /Please try later/,
  );
  await assert.rejects(
    submitToWeb3Forms(values, {
      accessKey: mockKey,
      fetchImpl: async () => ({
        ok: false,
        json: async () => ({ success: true }),
      }),
    }),
    /could not be submitted/,
  );
  assert.equal(JSON.stringify(values), before);
});
test("network errors and malformed responses have useful error states", async () => {
  await assert.rejects(
    submitToWeb3Forms(values, {
      accessKey: mockKey,
      fetchImpl: async () => {
        throw new Error("offline");
      },
    }),
    /Connection problem/,
  );
  await assert.rejects(
    submitToWeb3Forms(values, {
      accessKey: mockKey,
      fetchImpl: async () => ({
        ok: true,
        json: async () => {
          throw new Error("HTML response");
        },
      }),
    }),
    /Unable to confirm/,
  );
});
test("a timed-out request is aborted and reported without clearing input", async () => {
  await assert.rejects(
    submitToWeb3Forms(values, {
      accessKey: mockKey,
      timeoutMs: 1,
      fetchImpl: async (url, { signal }) =>
        new Promise((resolve, reject) =>
          signal.addEventListener("abort", () => reject(new Error("aborted")), {
            once: true,
          }),
        ),
    }),
    /timed out/,
  );
  assert.equal(values.name, "Test Client");
});
