/// <reference types="vite/client" />

interface Window {
  turnstile?: {
    render: (
      container: string | HTMLElement,
      options: {
        sitekey: string;
        theme?: "light" | "dark" | "auto";
        callback?: (token: string) => void;
        "error-callback"?: (error: unknown) => void;
        "expired-callback"?: () => void;
        [key: string]: unknown;
      },
    ) => string;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
    getResponse: (widgetId: string) => string | undefined;
  };
}
