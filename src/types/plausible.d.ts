export { };

declare global {
  interface Window {
    plausible: {
      (...args: unknown[]): void;
      q?: unknown[];
      o?: Record<string, unknown>;
      init?: (options?: Record<string, unknown>) => void;
    };
  }
}
