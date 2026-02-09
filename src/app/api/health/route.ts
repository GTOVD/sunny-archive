import { NextResponse } from 'next/server';

/**
 * Health check endpoint for deployment smoke tests.
 * Note: If Vercel Deployment Protection is enabled, requests will be blocked 
 * with 401 Unauthorized unless the x-vercel-protection-bypass header is present
 * OR the URL is accessed via a browser with a valid session.
 * 
 * The GitHub Action health-check.yml handles this by providing the bypass header
 * using the VERCEL_PROTECTION_BYPASS_TOKEN secret.
 */
export async function GET() {
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
