/**
 * Advanced Error Recovery Types (Issue #117)
 */

export type RecoveryStrategy = 'retry' | 'failover' | 'circuit-break' | 'silent-fail';

export interface RecoveryAction {
  id: string;
  timestamp: number;
  error: Error;
  strategy: RecoveryStrategy;
  success: boolean;
  context: Record<string, any>;
}

export interface CircuitBreakerState {
  service: string;
  status: 'closed' | 'open' | 'half-open';
  failureCount: number;
  lastFailureAt: number | null;
}
