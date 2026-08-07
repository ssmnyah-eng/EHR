"use client";

/**
 * Thin wrapper around Square's Web Payments SDK — the card form that
 * tokenizes a customer's card entirely client-side so the raw card
 * number never reaches EHR's own frontend or backend code, only Square's
 * script running in an isolated iframe it controls. Loaded dynamically
 * (not a static <script> tag) because which SDK build to load depends on
 * SQUARE_ENVIRONMENT, which the site only learns at runtime from
 * GET /config — see lib/square-client.ts.
 */

interface SquareCardTokenizeResult {
  status: "OK" | "ERROR";
  token?: string;
  errors?: { message: string }[];
}

interface SquareCard {
  attach(selector: string): Promise<void>;
  destroy(): Promise<void>;
  tokenize(): Promise<SquareCardTokenizeResult>;
}

interface SquarePayments {
  card(): Promise<SquareCard>;
}

interface SquareGlobal {
  payments(applicationId: string, locationId: string): SquarePayments;
}

declare global {
  interface Window {
    Square?: SquareGlobal;
  }
}

const SDK_URL: Record<"sandbox" | "production", string> = {
  sandbox: "https://sandbox.web.squarecdn.com/v1/square.js",
  production: "https://web.squarecdn.com/v1/square.js",
};

let loadPromise: Promise<void> | null = null;

function loadSquareSdk(environment: "sandbox" | "production"): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("The Square payment form can only load in a browser."));
  if (window.Square) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL[environment];
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Could not load the Square payment form. Check your connection and try again."));
    };
    document.head.appendChild(script);
  });
  return loadPromise;
}

/**
 * Loads the SDK if needed, initializes it with the given Application/
 * Location ID, creates a card input, and attaches it into the DOM
 * element with id `containerId` (must already be mounted). Returns the
 * live SquareCard instance — call `.tokenize()` on it at submit time to
 * get the one-time source_id the backend's POST /payments expects, and
 * `.destroy()` on unmount to avoid leaking the attached iframe.
 */
export async function mountSquareCard(applicationId: string, locationId: string, environment: "sandbox" | "production", containerId: string): Promise<SquareCard> {
  await loadSquareSdk(environment);
  if (!window.Square) throw new Error("Square payment form failed to load.");
  const payments = window.Square.payments(applicationId, locationId);
  const card = await payments.card();
  await card.attach(`#${containerId}`);
  return card;
}

export type { SquareCard, SquareCardTokenizeResult };
