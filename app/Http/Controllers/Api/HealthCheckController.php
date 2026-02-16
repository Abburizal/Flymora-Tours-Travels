<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class HealthCheckController extends Controller
{
    public function index()
    {
        $health = [
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'version' => config('app.version', '1.0.0'),
            'checks' => []
        ];

        // Database check
        try {
            DB::connection()->getPdo();
            $health['checks']['database'] = 'ok';
        } catch (\Exception $e) {
            $health['status'] = 'degraded';
            $health['checks']['database'] = 'failed';
        }

        // Cache check
        try {
            Cache::put('health_check', true, 10);
            $cacheWorks = Cache::get('health_check') === true;
            $health['checks']['cache'] = $cacheWorks ? 'ok' : 'failed';
            
            if (!$cacheWorks) {
                $health['status'] = 'degraded';
            }
        } catch (\Exception $e) {
            $health['status'] = 'degraded';
            $health['checks']['cache'] = 'failed';
        }

        // Storage check
        try {
            $storagePath = storage_path('app');
            $health['checks']['storage'] = is_writable($storagePath) ? 'ok' : 'failed';
            
            if (!is_writable($storagePath)) {
                $health['status'] = 'degraded';
            }
        } catch (\Exception $e) {
            $health['status'] = 'degraded';
            $health['checks']['storage'] = 'failed';
        }

        $statusCode = $health['status'] === 'ok' ? 200 : 503;
        
        return response()->json($health, $statusCode);
    }

    public function ping()
    {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toIso8601String()
        ]);
    }
}
