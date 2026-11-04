import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import {
  emptyInquiry,
  pageOptions,
  durationOptions,
  designOptions,
  featureOptions,
} from "../src/data/inquiry.js";
import {
  profile,
  services,
  projects,
  skills,
  experience,
} from "../src/data/portfolio.js";
import {
  validateInquiry,
  createInquiryMessage,
  emailLink,
  whatsappLink,
} from "../src/utils/inquiry.js";

const valid = {
  ...emptyInquiry,
  name: "Test Visitor",
  email: "visitor@example.com",
  service: "react",
  pages: "2-3",
  duration: "2-weeks",
  message: "I need a responsive React website for my business.",
};

test("inquiry requires the useful core fields without a price field", () => {
  assert.deepEqual(Object.keys(validateInquiry(emptyInquiry)), [
    "name",
    "email",
    "service",
    "pages",
    "duration",
    "message",
  ]);
  assert.deepEqual(validateInquiry(valid), {});
  assert.ok(
    !Object.keys(emptyInquiry).some((key) =>
      /price|budget|cost|rate/.test(key),
    ),
  );
});
test("every offered pages, duration, design, and service option validates", () => {
  for (const option of pageOptions)
    assert.deepEqual(validateInquiry({ ...valid, pages: option.value }), {});
  for (const option of durationOptions)
    assert.deepEqual(validateInquiry({ ...valid, duration: option.value }), {});
  for (const option of designOptions)
    assert.deepEqual(validateInquiry({ ...valid, design: option.value }), {});
  for (const service of services)
    assert.deepEqual(validateInquiry({ ...valid, service: service.id }), {});
  assert.ok(validateInquiry({ ...valid, pages: "unrecognized" }).pages);
  assert.ok(validateInquiry({ ...valid, duration: "unrecognized" }).duration);
});
test("validation rejects invalid email, unsafe URLs, and short messages", () => {
  assert.ok(validateInquiry({ ...valid, email: "broken@" }).email);
  assert.ok(
    validateInquiry({ ...valid, website: "javascript:alert(1)" }).website,
  );
  assert.ok(validateInquiry({ ...valid, website: "example.com" }).website);
  assert.ok(validateInquiry({ ...valid, message: "short" }).message);
  assert.deepEqual(
    validateInquiry({ ...valid, website: "https://example.com/path" }),
    {},
  );
});
test("prepared brief preserves choices and never adds automatic prices", () => {
  const message = createInquiryMessage({
    ...valid,
    company: "Example & Co",
    design: "figma",
    website: "https://example.com",
    features: [...featureOptions],
  });
  assert.ok(message.includes("2–3 pages"));
  assert.ok(message.includes("Within 2 weeks"));
  assert.ok(message.includes("Figma / finished design"));
  for (const feature of featureOptions) assert.ok(message.includes(feature));
  assert.ok(message.includes("personal quotation"));
  assert.ok(!/₹|INR|7,500|9,500|hourly rate|estimated price/i.test(message));
});
test("email and WhatsApp safely encode the complete brief", () => {
  const body = createInquiryMessage({
    ...valid,
    message: "Build a React website with search & filtering? Please discuss.",
  });
  const email = new URL(emailLink(body, "Project & ideas\nHello"));
  assert.equal(email.protocol, "mailto:");
  assert.equal(email.pathname, profile.email);
  assert.equal(email.searchParams.get("body"), body);
  assert.equal(email.searchParams.get("subject"), "Project & ideas Hello");
  const wa = new URL(whatsappLink(body));
  assert.equal(wa.pathname, "/919714558126");
  assert.equal(wa.searchParams.get("text"), body);
});
test("confirmed project statuses, experience and skill boundaries remain accurate", () => {
  assert.equal(experience.length, 4);
  assert.equal(services.length, 7);
  assert.equal(projects.length, 7);
  assert.equal(projects.filter((p) => p.status === "Completed").length, 5);
  assert.deepEqual(
    projects.filter((p) => p.status === "In Progress").map((p) => p.id),
    ["atal", "motiwala"],
  );
  assert.deepEqual(
    skills.filter((s) => s.category === "Beginner").map((s) => s.name),
    ["TypeScript", "Next.js"],
  );
  assert.ok(
    !skills.some((s) =>
      /motion|gsap|three|wordpress|woocommerce/i.test(s.name),
    ),
  );
  assert.equal(profile.resume, null);
});
test("all images exist and the profile photo is the exact supplied original", () => {
  for (const project of projects) {
    assert.equal(new URL(project.repo).protocol, "https:");
    if (project.image) assert.ok(fs.existsSync(`public${project.image}`));
  }
  const photo = fs.readFileSync(`public${profile.photo}`);
  assert.equal(
    crypto.createHash("sha256").update(photo).digest("hex"),
    "26ce277474b2b42443791d9d098d02964acde49d08b643347ac961ae4e59fdd9",
  );
  assert.equal(photo.readUInt32BE(16), profile.photoWidth);
  assert.equal(photo.readUInt32BE(20), profile.photoHeight);
});
