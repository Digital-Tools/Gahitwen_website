import { useEffect, useRef, useCallback } from 'react';

interface TurnstileWidgetProps {
  sitekey: string;
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark' | 'auto';
  resetKey?: number;
}

// Load the Turnstile script once globally
let scriptLoaded = false;
let scriptLoading = false;
const pendingCallbacks: Array<() => void> = [];

function loadTurnstileScript(onLoad: () => void) {
  if (scriptLoaded) {
    onLoad();
    return;
  }
  pendingCallbacks.push(onLoad);
  if (scriptLoading) return;
  scriptLoading = true;

  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    scriptLoaded = true;
    pendingCallbacks.forEach((cb) => cb());
    pendingCallbacks.length = 0;
  };
  document.head.appendChild(script);
}

const TurnstileWidget = ({ sitekey, onVerify, theme = 'light', resetKey = 0 }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return;

    // Remove previous widget if any
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        theme,
        callback: (token: string) => {
          onVerifyRef.current(token);
        },
      });
    } catch {
      // Turnstile render failed — container may be empty or invalid
    }
  }, [sitekey, theme]);

  useEffect(() => {
    loadTurnstileScript(() => {
      renderWidget();
    });
  }, [renderWidget]);

  // Re-render widget when resetKey changes
  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default TurnstileWidget;
