<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Notifications\BookingCancelledNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookingCancellationController extends Controller
{
    public function cancel(Request $request, $id)
    {
        try {
            $booking = Booking::with(['user', 'tour'])
                ->where('id', $id)
                ->where('user_id', $request->user()->id)
                ->firstOrFail();

            // Only allow cancelling pending or confirmed bookings
            if (!in_array($booking->status, ['pending', 'confirmed'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'This booking cannot be cancelled. Status: ' . $booking->status
                ], 400);
            }

            // Update status
            $booking->status = 'cancelled';
            $booking->save();

            // Release booked participants
            if ($booking->tour) {
                $booking->tour->decrement('booked_participants', $booking->number_of_participants);
            }

            // Send cancellation notification
            try {
                $request->user()->notify(new BookingCancelledNotification($booking, 'user_cancelled'));
                Log::info("Booking #{$booking->id} cancelled by user and notification sent");
            } catch (\Exception $e) {
                Log::error("Failed to send cancellation notification: " . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Booking cancelled successfully. A confirmation email has been sent.',
                'data' => $booking
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found or you do not have permission to cancel it.'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Booking cancellation failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to cancel booking: ' . $e->getMessage()
            ], 500);
        }
    }
}
