<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Notifications\BookingCancelledNotification;
use Illuminate\Support\Facades\Log;

class ExpireBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:expire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Auto cancel expired pending bookings and send notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiredBookings = Booking::with(['user', 'tour'])
            ->where('status', 'pending')
            ->whereNotNull('expired_at')
            ->where('expired_at', '<', now())
            ->get();

        $count = 0;
        foreach ($expiredBookings as $booking) {
            $booking->status = 'cancelled';
            $booking->save();
            
            // Send cancellation notification
            try {
                $booking->user->notify(new BookingCancelledNotification($booking, 'payment_expired'));
                Log::info("Booking #{$booking->id} expired and notification sent to {$booking->user->email}");
                $count++;
            } catch (\Exception $e) {
                Log::error("Failed to send cancellation notification for booking #{$booking->id}: " . $e->getMessage());
            }
        }

        $this->info($count . ' bookings have been expired, cancelled, and notifications sent.');
        
        return Command::SUCCESS;
    }
}
