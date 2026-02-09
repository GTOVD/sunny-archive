import { NextRequest } from 'next/server';

/**
 * Validates internal API requests.
 * Currently checks for Vercel's deployment protection bypass token.
 * Can be expanded to include other shared secrets.
 */
export function validateInternalRequest(req: NextRequest): boolean {
  const bypassToken = process.env.VERCEL_PROTECTION_BYPASS_TOKEN;
  const headerToken = req.headers.get('x-vercel-protection-bypass');

  if (!bypassToken) {
    // If token isn't configured, we allow it to avoid locking ourselves out
    // in dev environments, but log a warning.
    if (process.env.NODE_ENV === 'production') {
      console.warn('VERCEL_PROTECTION_BYPASS_TOKEN is not set in production');
    }
    return true;
  }

  return headerToken === bypassToken;
}

export const AUTH_ERROR_RESPONSE = {
  json: { error: 'Unauthorized', message: 'Missing or invalid authentication token' },
  status: 401
};
