declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

let initialized = false;

/** Load GA4 when VITE_GA_MEASUREMENT_ID is set (no-op otherwise). */
export const initGoogleAnalytics = (): void => {
  const id = GA_MEASUREMENT_ID?.trim();
  if (!id || initialized) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);

  initialized = true;
};

export const trackPageView = (path: string): void => {
  const id = GA_MEASUREMENT_ID?.trim();
  if (!id || !window.gtag) return;
  window.gtag('config', id, { page_path: path });
};
