import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

/**
 * Gets the current correlation ID from headers or generates a new one.
 * This is useful for tracking requests across logs and services.
 */
export async function getCorrelationId(): Promise<string> {
  const headerList = await headers();
  const existingId = headerList.get(CORRELATION_ID_HEADER);
  
  return existingId || uuidv4();
}

/**
 * Creates a standard request context for logging and tracking.
 */
export async function getRequestContext() {
  const correlationId = await getCorrelationId();
  const timestamp = new Date().toISOString();
  
  return {
    correlationId,
    timestamp,
  };
}
