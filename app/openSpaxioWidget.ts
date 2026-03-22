/**
 * Opens the Spaxio Assistant chat widget (script in root layout).
 * The launcher lives in a closed shadow root; there is no public open() API.
 */

type OpenOpts = {
  locale?: "en" | "fr";
};

export function openSpaxioChatWidget(opts?: OpenOpts): void {
  if (typeof window === "undefined") return;

  const w = window as Window & {
    SpaxioAssistant?: { setLanguage?: (lang: string) => void };
  };
  if (opts?.locale) {
    try {
      w.SpaxioAssistant?.setLanguage?.(opts.locale);
    } catch {
      // Widget may still be loading.
    }
  }

  const tryOpen = (): boolean => {
    const host = document.querySelector("#spaxio-widget-host");
    const root = host?.shadowRoot;
    if (!root) return false;
    const panel = root.querySelector(".spaxio-panel");
    if (panel?.classList.contains("open")) return true;
    const bubble = root.querySelector(".spaxio-bubble");
    if (bubble instanceof HTMLElement) {
      bubble.click();
      return true;
    }
    return false;
  };

  if (tryOpen()) return;

  let attempts = 0;
  const maxAttempts = 50;
  const id = window.setInterval(() => {
    attempts += 1;
    if (tryOpen() || attempts >= maxAttempts) {
      window.clearInterval(id);
    }
  }, 100);
}
