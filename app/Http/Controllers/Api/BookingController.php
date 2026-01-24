<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Booking::with('tour')->get()
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            // Security: Ensure user is authenticated
            if (!auth()->check()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated'
                ], 401);
            }

            $validated = $request->validate([
                'tour_id' => 'required|exists:tours,id',
                'booking_date' => 'required|date',
                'number_of_participants' => 'required|integer|min:1',
            ]);

            // Use authenticated user ID instead of user input (SECURITY FIX)
            $userId = auth()->id();
            $expiryMinutes = config('booking.expiry_minutes', 30);

            // CONCURRENCY FIX: Use database transaction with row locking
            $booking = \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $userId, $expiryMinutes) {
                // Lock the tour row to prevent race condition
                $tour = \App\Models\Tour::where('id', $validated['tour_id'])
                    ->lockForUpdate()
                    ->first();

                if (!$tour) {
                    throw new \Exception('Tour not found');
                }

                // Calculate available seats
                $available = $tour->max_participants - $tour->booked_participants;

                // Check if enough seats available
                if ($available < $validated['number_of_participants']) {
                    throw new \Exception(
                        'Not enough seats available. Available: ' . $available . 
                        ', Requested: ' . $validated['number_of_participants']
                    );
                }

                // Calculate total price
                $total_price = $tour->price * $validated['number_of_participants'];

                // Set expiry time
                $expiredAt = now()->addMinutes($expiryMinutes);

                // Create booking
                $booking = Booking::create([
                    'tour_id' => $validated['tour_id'],
                    'user_id' => $userId,
                    'booking_date' => $validated['booking_date'],
                    'number_of_participants' => $validated['number_of_participants'],
                    'total_price' => $total_price,
                    'status' => 'pending',
                    'expired_at' => $expiredAt,
                ]);

                return [
                    'booking' => $booking,
                    'expired_at' => $expiredAt,
                    'available' => $available,
                    'total_price' => $total_price,
                ];
            }, 5); // 5 attempts for deadlock retry

            return response()->json([
                'success' => true,
                'data' => $booking['booking'],
                'expired_at' => $booking['expired_at'],
                'remaining_seconds' => $expiryMinutes * 60,
                'available_seats' => $booking['available'] - $validated['number_of_participants'],
                'message' => 'Booking created successfully. Payment required within ' . $expiryMinutes . ' minutes.'
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}