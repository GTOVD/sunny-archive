import { NextRequest, NextResponse } from 'next/server';
import { validateInternalRequest, AUTH_ERROR_RESPONSE } from '@/lib/auth/internal-api';

/**
 * Health check endpoint for deployment smoke tests.
 * This route is intended for internal/CI use and validates the 
 * x-vercel-protection-bypass header to ensure it's a legitimate request.
 */
export async function GET(req: NextRequest) {
  if (!validateInternalRequest(req)) {
    return NextResponse.json(AUTH_ERROR_RESPONSE.json, { status: AUTH_ERROR_RESPONSE.status });
  }

  const version = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';
  const gitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev';
  
  return NextResponse.json(
    { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || 'development',
      version,
      commit: gitSha
    }, 
    { status: 200 }
  );
}
