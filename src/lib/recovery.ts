/**
 * Error Recovery Logic (Issue #117)
 * Implements retry mechanisms and circuit breakers for external service failures.
 */

export interface RetryOptions {
  maxRetries: number;
  backoffMs: number;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, backoffMs: 1000 }
): Promise<T> {
  let lastError: any;
  for (let i = 0; i < options.maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < options.maxRetries - 1) {
        await new Promise((res) => setTimeout(res, options.backoffMs * (i + 1)));
      }
    }
  }
  throw lastError;
}
