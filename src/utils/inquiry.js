import { profile, services } from "../data/portfolio.js";
import {
  pageOptions,
  durationOptions,
  designOptions,
  featureOptions,
} from "../data/inquiry.js";

const contains = (options, value) =>
  options.some((option) => option.value === value);
const labelFor = (options, value) =>
  options.find((option) => option.value === value)?.label || "Not specified";
export function isValidContactEmail(value) {
  const email = value.trim();
  const parts = email.split("@");
  if (email.length > 254 || parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  const labels = domain.split(".");
  return labels.length > 1 && labels.every(label => /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label));
}
export function validateInquiry(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!isValidContactEmail(values.email))
    errors.email = "Please enter a valid email address.";
  const phone = (values.phone || "").trim();
  if (
    phone &&
    !/^\+?\d{7,15}$/.test(phone.replace(/[\s().-]/g, ""))
  )
    errors.phone =
      "Please enter a valid phone number, including country code if applicable.";
  if (!services.some((service) => service.id === values.service))
    errors.service = "Please select a service.";
  if (!contains(pageOptions, values.pages))
    errors.pages = "Please select the number of pages.";
  if (!contains(durationOptions, values.duration))
    errors.duration = "Please select your preferred timeline.";
  if (values.design && !contains(designOptions, values.design))
    errors.design = "Please select one of the design options.";
  if (values.website.trim()) {
    try {
      const url = new URL(values.website.trim());
      if (!["https:", "http:"].includes(url.protocol))
        throw new Error("protocol");
    } catch {
      errors.website = "Please enter a full http:// or https:// website URL.";
    }
  }
  if (values.message.trim().length < 20)
    errors.message = "Please describe your project in at least 20 characters.";
  return errors;
}

// The contact dialog needs only the essentials; detailed inquiries remain supported.
export function validateContact(values) {
  const errors = validateInquiry(values);
  if (!values.pages) delete errors.pages;
  if (!values.duration) delete errors.duration;
  return errors;
}

export function createInquiryMessage(values) {
  const service =
    services.find((item) => item.id === values.service)?.name ||
    "Frontend development";
  const features = featureOptions.filter((feature) =>
    values.features.includes(feature),
  );
  return `Hi Nirmik, I'd like to discuss a frontend project.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}${values.phone?.trim() ? `\nPhone / WhatsApp: ${values.phone.trim()}` : ""}${values.company.trim() ? `\nCompany: ${values.company.trim()}` : ""}\nService: ${service}\nPages: ${labelFor(pageOptions, values.pages)}\nPreferred timeline: ${labelFor(durationOptions, values.duration)}\nDesign: ${labelFor(designOptions, values.design)}${values.website.trim() ? `\nExisting website: ${values.website.trim()}` : ""}\nFeatures: ${features.join(", ") || "To discuss"}\n\nProject brief:\n${values.message.trim()}\n\nPlease review my brief and share your availability and a personal quotation.`;
}
export const whatsappLink = (
  message = "Hi Nirmik, I would like to discuss a frontend development project.",
) => `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;
export const emailLink = (body = "", subject = "Frontend project inquiry") =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject.replace(/[\r\n]/g, " "))}&body=${encodeURIComponent(body)}`;
