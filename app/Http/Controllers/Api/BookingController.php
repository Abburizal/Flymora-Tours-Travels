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
            $validated = $request->validate([
                'tour_id' => 'required|exists:tours,id',
                'user_id' => 'required|exists:users,id',
                'booking_date' => 'required|date',
                'number_of_participants' => 'required|integer|min:1',
            ]);

            // Calculate total price  
            // Fetch fresh tour data each time (not cached)
            $tour = \App\Models\Tour::findOrFail($validated['tour_id']);
            $total_price = $tour->price * $validated['number_of_participants'];

            // CHECK QUOTA BEFORE BOOKING (UX validation)
            // Refresh tour to get latest booked_participants
            $tour->refresh();
            $available = $tour->max_participants - $tour->booked_participants;
            if ($available < $validated['number_of_participants']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not enough seats available',
                    'available' => $available,
                    'requested' => $validated['number_of_participants']
                ], 422);
            }

            // Set expiry time (30 minutes from now)
            $expiryMinutes = 30;
            $expiredAt = now()->addMinutes($expiryMinutes);

            $booking = Booking::create([
                'tour_id' => $validated['tour_id'],
                'user_id' => $validated['user_id'],
                'booking_date' => $validated['booking_date'],
                'number_of_participants' => $validated['number_of_participants'],
                'total_price' => $total_price,
                'status' => 'pending',
                'expired_at' => $expiredAt,
            ]);

            return response()->json([
                'success' => true,
                'data' => $booking,
                'expired_at' => $expiredAt,
                'remaining_seconds' => $expiryMinutes * 60,
                'available_seats' => $available - $validated['number_of_participants'],
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