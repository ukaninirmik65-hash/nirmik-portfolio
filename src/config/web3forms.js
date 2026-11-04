export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function getWeb3FormsAccessKey() {
  return (import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY || "").trim();
}

export function hasWeb3FormsAccessKey(key) {
  return (
    typeof key === "string" && !!key.trim() && !/YOUR_|PLACEHOLDER/i.test(key)
  );
}
