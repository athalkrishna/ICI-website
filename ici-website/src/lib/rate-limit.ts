import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        if (isRateLimited) {
          reject('Rate limit exceeded');
        } else {
          resolve();
        }
      }),
  };
}

// 5 attempts per 15 minutes per IP for logins
export const loginRateLimiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 500,
});

// 30 submissions per hour per IP for public forms
export const formRateLimiter = rateLimit({
  interval: 60 * 60 * 1000,
  uniqueTokenPerInterval: 1000,
});
