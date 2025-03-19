export type AccessBlacklisted = {
  id: number;
  remainingMinutes: number;
  blockedUntil: string;
  userAgent: string;
  ipAddress: string;
  username: string;
  attemptTime: string;
  failuresSinceStart: number;
};
