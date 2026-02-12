<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Notifications\PaymentReminderNotification;
use Illuminate\Console\Command;

class SendPaymentReminders extends Command
{
    protected $signature = 'reminders:payment';
    protected $description = 'Send payment reminders for pending bookings';

    public function handle()
    {
        $this->info('Checking for pending bookings...');
        
        // Find bookings that are pending and expiring within 6 hours
        $bookings = Booking::with(['user', 'tour'])
            ->where('status', 'pending')
            ->whereNotNull('expired_at')
            ->whereBetween('expired_at', [now(), now()->addHours(6)])
            ->get();
        
        $count = 0;
        foreach ($bookings as $booking) {
            try {
                $booking->user->notify(new PaymentReminderNotification($booking));
                $count++;
                $this->info("✅ Reminder sent to {$booking->user->email}");
            } catch (\Exception $e) {
                $this->error("❌ Failed to send reminder to {$booking->user->email}: " . $e->getMessage());
            }
        }
        
        $this->info("✨ Payment reminders sent: {$count}/{$bookings->count()}");
        return Command::SUCCESS;
    }
}
