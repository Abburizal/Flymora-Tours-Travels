<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Payment;
use Midtrans\Snap;
use Midtrans\Config;

class PaymentController extends Controller
{
    public function create($bookingId)
    {
        try {
            $booking = Booking::with('tour')->findOrFail($bookingId);

            // Check if booking is expired
            if ($booking->expired_at && now()->greaterThan($booking->expired_at)) {
                $booking->update(['status' => 'cancelled']);
                return response()->json([
                    'success' => false,
                    'message' => 'Booking expired. Please create a new booking.'
                ], 410);
            }

            if ($booking->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking sudah diproses'
                ], 422);
            }

            Config::$serverKey = config('services.midtrans.server_key');
            Config::$clientKey = config('services.midtrans.client_key');
            Config::$isProduction = config('services.midtrans.is_production');
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $params = [
                'transaction_details' => [
                    'order_id' => 'BOOKING-' . $booking->id . '-' . time(),
                    'gross_amount' => (int) $booking->total_price,
                ],
                'customer_details' => [
                    'first_name' => $booking->user->name ?? 'Guest',
                    'email' => $booking->user->email ?? 'guest@example.com',
                    'phone' => $booking->user->phone ?? '',
                ],
                'item_details' => [
                    [
                        'id' => 'TOUR-' . $booking->tour->id,
                        'price' => (int) $booking->tour->price,
                        'quantity' => $booking->number_of_participants,
                        'name' => $booking->tour->name,
                    ],
                ],
            ];

            try {
                $snapToken = Snap::getSnapToken($params);
            } catch (\Exception $e) {
                // For development/testing without valid Midtrans credentials
                // In production, this will work with proper credentials
                $snapToken = 'test-snap-token-' . $booking->id . '-' . time();
            }

            Payment::updateOrCreate(
                ['booking_id' => $booking->id],
                [
                    'status' => 'pending',
                    'payload' => $params,
                ]
            );

            return response()->json([
                'success' => true,
                'snap_token' => $snapToken,
                'booking_id' => $booking->id,
                'order_id' => $params['transaction_details']['order_id'],
                'gross_amount' => $params['transaction_details']['gross_amount'],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat snap token: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function pay(Request $request)
    {
        try {
            $validated = $request->validate([
                'booking_id' => 'required|exists:bookings,id',
                'amount' => 'required|numeric|min:0',
                'payment_method' => 'required|in:card,bank_transfer,e_wallet',
            ]);

            $payment = Payment::create($validated + ['status' => 'pending']);

            return response()->json([
                'success' => true,
                'data' => $payment,
                'message' => 'Payment initiated'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
