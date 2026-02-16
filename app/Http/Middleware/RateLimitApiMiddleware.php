<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class RateLimitApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Use IP address as the rate limit key
        $key = 'api:' . $request->ip();
        
        // Get rate limit config from request route or use default
        $maxAttempts = $this->getMaxAttempts($request);
        $decaySeconds = 60; // 1 minute window
        
        // Check if rate limit exceeded
        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            $retryAfter = RateLimiter::availableIn($key);
            
            return response()->json([
                'success' => false,
                'message' => 'Too many requests. Please try again later.',
                'retry_after' => $retryAfter
            ], Response::HTTP_TOO_MANY_REQUESTS)
                ->header('Retry-After', $retryAfter)
                ->header('X-RateLimit-Limit', $maxAttempts)
                ->header('X-RateLimit-Remaining', 0);
        }
        
        // Hit the rate limiter
        RateLimiter::hit($key, $decaySeconds);
        
        // Process the request
        $response = $next($request);
        
        // Add rate limit headers to response
        $remaining = RateLimiter::remaining($key, $maxAttempts);
        
        return $response
            ->header('X-RateLimit-Limit', $maxAttempts)
            ->header('X-RateLimit-Remaining', max(0, $remaining));
    }
    
    /**
     * Get max attempts based on route or use default
     */
    protected function getMaxAttempts(Request $request): int
    {
        // Check if route has custom rate limit
        $route = $request->route();
        
        if ($route && $route->getAction('rate_limit')) {
            return (int) $route->getAction('rate_limit');
        }
        
        // Default rate limits based on route type
        if ($request->is('api/auth/*')) {
            return 5; // Stricter for auth endpoints
        }
        
        if ($request->is('api/bookings*')) {
            return 10; // Moderate for booking endpoints
        }
        
        return 60; // Default for general API
    }
}
