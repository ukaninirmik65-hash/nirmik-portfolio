export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Web3Forms documents this as a public, browser-visible form identifier.
// Vercel/local environment configuration can override it; never put private credentials here.
const PUBLIC_FORM_ACCESS_KEY = "a4751b97-dba1-43b1-a1d8-e805e97ed512";

export function getWeb3FormsAccessKey() {
  const override = (import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY || "").trim();
  return hasWeb3FormsAccessKey(override) ? override : PUBLIC_FORM_ACCESS_KEY;
}

export function hasWeb3FormsAccessKey(key) {
  return (
    typeof key === "string" && !!key.trim() && !/YOUR_|PLACEHOLDER/i.test(key)
  );
}
