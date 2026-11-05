import { useEffect } from "react";

const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || "";
const isMeasurementId =
  /^G-[A-Z0-9]+$/i.test(measurementId) &&
  !/^(YOUR_|PLACEHOLDER|G-X+$)/i.test(measurementId);
const scriptId = "ga4-script";
const lastPageViewKey = "__nirmikGa4LastPageView";

function currentPageLocation() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function sendPageView() {
  const pagePath = currentPageLocation();
  if (window[lastPageViewKey] === pagePath) return;

  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
  });
  window[lastPageViewKey] = pagePath;
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!import.meta.env.PROD || !isMeasurementId) return undefined;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args) {
      window.dataLayer.push(args);
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }

    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
    sendPageView();

    window.addEventListener("hashchange", sendPageView);
    window.addEventListener("popstate", sendPageView);
    return () => {
      window.removeEventListener("hashchange", sendPageView);
      window.removeEventListener("popstate", sendPageView);
    };
  }, []);

  return null;
}
