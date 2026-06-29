
const rateLimitMap = new Map();

export function rateLimit(ip, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  const requestTimestamps = rateLimitMap.get(ip) || [];
  const recentRequests = requestTimestamps.filter(timestamp => timestamp > windowStart);
  
  if (recentRequests.length >= limit) {
    return { success: false, remaining: 0, reset: windowStart + windowMs };
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  return { 
    success: true, 
    remaining: limit - recentRequests.length,
    reset: windowStart + windowMs
  };
}

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  const windowMs = 60000;
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const recent = timestamps.filter(t => t > now - windowMs);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  }
}, 3600000);