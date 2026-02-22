import { NextRequest } from 'next/server';

/**
 * Validates internal API requests.
 * Currently checks for Vercel's deployment protection bypass token.
 * Can be expanded to include other shared secrets.
 */
export function validateInternalRequest(req: NextRequest): boolean {
  const bypassToken = process.env.VERCEL_PROTECTION_BYPASS_TOKEN;
  const headerToken = req.headers.get('x-vercel-protection-bypass');
  const sharedKey = process.env.INTERNAL_API_KEY;
  const authHeader = req.headers.get('Authorization');

  // Priority 1: Vercel Protection Bypass
  if (bypassToken && headerToken === bypassToken) {
    return true;
  }

  // Priority 2: Shared Secret Key (Internal API Key)
  if (sharedKey && authHeader === `Bearer ${sharedKey}`) {
    return true;
  }

  // Fallback for non-production environments if no tokens are set
  if (!bypassToken && !sharedKey && process.env.NODE_ENV !== 'production') {
    return true;
  }

  if (process.env.NODE_ENV === 'production' && !bypassToken && !sharedKey) {
    console.warn('Security Warning: No internal API authentication tokens configured in production');
  }

  return false;
}

export const AUTH_ERROR_RESPONSE = {
  json: { error: 'Unauthorized', message: 'Missing or invalid authentication token' },
  status: 401
};
