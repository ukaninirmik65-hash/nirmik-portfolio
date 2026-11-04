import {
  WEB3FORMS_ENDPOINT,
  getWeb3FormsAccessKey,
  hasWeb3FormsAccessKey,
} from "../config/web3forms.js";
import { services } from "../data/portfolio.js";
import {
  pageOptions,
  durationOptions,
  designOptions,
  featureOptions,
} from "../data/inquiry.js";

const optionLabel = (options, value) =>
  options.find((option) => option.value === value)?.label || "Not specified";

export function buildSubmission(values, accessKey, botcheck = false) {
  const data = new FormData();
  // All existing controls are included, even when an optional field is empty.
  for (const field of [
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
  ]) {
    data.set(field, String(values[field] || "").trim());
  }
  const service =
    services.find((item) => item.id === values.service)?.name ||
    "Frontend development";
  const features = featureOptions.filter((feature) =>
    values.features.includes(feature),
  );
  data.set("features", features.join(", ") || "None selected");
  featureOptions.forEach((feature, index) =>
    data.set(
      `feature_${index + 1}`,
      `${feature}: ${features.includes(feature) ? "Yes" : "No"}`,
    ),
  );
  data.set("project_type", service);
  data.set("required_services", [service, ...features].join(", "));
  data.set("number_of_pages", optionLabel(pageOptions, values.pages));
  data.set("project_timeline", optionLabel(durationOptions, values.duration));
  data.set("design_readiness", optionLabel(designOptions, values.design));
  data.set("access_key", accessKey.trim());
  data.set("replyto", values.email.trim());
  data.set("subject", `Portfolio inquiry — ${service}`);
  data.set("from_name", "Nirmik Ukani Portfolio");
  data.set("form_name", "Contact / Project Inquiry");
  if (botcheck) data.set("botcheck", "on");
  return data;
}

export async function submitToWeb3Forms(
  values,
  {
    accessKey = getWeb3FormsAccessKey(),
    botcheck = false,
    fetchImpl = globalThis.fetch,
    timeoutMs = 25000,
  } = {},
) {
  if (botcheck)
    throw new Error(
      "Unable to send this inquiry. Please use email or WhatsApp.",
    );
  if (!hasWeb3FormsAccessKey(accessKey)) {
    throw new Error(
      "This form is not configured yet. Your details are still here. Please use email or WhatsApp to contact me.",
    );
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response;
    try {
      response = await fetchImpl(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        // The browser must set the multipart boundary; do not add Content-Type.
        body: buildSubmission(values, accessKey, botcheck),
        signal: controller.signal,
      });
    } catch {
      throw new Error(
        controller.signal.aborted
          ? "The request timed out. Your details are still here. Please try again or contact me directly."
          : "Connection problem. Your details are still here. Please try again or use email or WhatsApp.",
      );
    }
    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error(
        "Unable to confirm the submission. Your details are still here. Please try again or contact me directly.",
      );
    }
    if (!response.ok || result?.success !== true) {
      throw new Error(
        typeof result?.message === "string" && result.message.trim()
          ? result.message
          : "Your inquiry could not be submitted. Please try again or contact me directly.",
      );
    }
    return result;
  } finally {
    clearTimeout(timeout);
  }
}
