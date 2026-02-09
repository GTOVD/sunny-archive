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
  return NextResponse.json(
    { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || 'development'
    }, 
    { status: 200 }
  );
}
