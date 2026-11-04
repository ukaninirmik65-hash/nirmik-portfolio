export const pageOptions = [
  { value: "1", label: "1 page / landing page" },
  { value: "2-3", label: "2–3 pages" },
  { value: "4-5", label: "4–5 pages" },
  { value: "6-10", label: "6–10 pages" },
  { value: "11-15", label: "11–15 pages" },
  { value: "15+", label: "More than 15 pages" },
  { value: "not-sure", label: "Not sure yet — let’s discuss" },
];
export const durationOptions = [
  { value: "1-week", label: "Within 1 week" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "3-4-weeks", label: "Within 3–4 weeks" },
  { value: "1-2-months", label: "Within 1–2 months" },
  { value: "flexible", label: "Flexible timeline" },
  { value: "not-sure", label: "Not sure yet — let’s discuss" },
];
export const designOptions = [
  { value: "figma", label: "I have a Figma / finished design" },
  { value: "references", label: "I have references or rough ideas" },
  { value: "existing", label: "I have an existing website to improve" },
  { value: "discuss", label: "I’d like to discuss the design" },
];
export const featureOptions = [
  "REST API integration",
  "Contact form",
  "Custom interactions",
  "Existing content migration",
];
export const emptyInquiry = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  pages: "",
  duration: "",
  design: "",
  website: "",
  features: [],
  message: "",
};
