<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Notifications\TripReminderNotification;
use Illuminate\Console\Command;

class SendTripReminders extends Command
{
    protected $signature = 'reminders:trip';
    protected $description = 'Send trip reminders for upcoming bookings';

    public function handle()
    {
        $this->info('Checking for upcoming trips...');
        
        // Find paid bookings with tours starting in 3 days or 1 day
        $reminderDays = [3, 1];
        $totalSent = 0;
        
        foreach ($reminderDays as $days) {
            $targetDate = now()->addDays($days)->format('Y-m-d');
            
            $bookings = Booking::with(['user', 'tour'])
                ->where('status', 'paid')
                ->whereHas('tour', function($query) use ($targetDate) {
                    $query->whereDate('start_date', $targetDate);
                })
                ->get();
            
            foreach ($bookings as $booking) {
                try {
                    $booking->user->notify(new TripReminderNotification($booking, $days));
                    $totalSent++;
                    $this->info("✅ {$days}-day reminder sent to {$booking->user->email} for {$booking->tour->name}");
                } catch (\Exception $e) {
                    $this->error("❌ Failed to send reminder: " . $e->getMessage());
                }
            }
        }
        
        $this->info("✨ Trip reminders sent: {$totalSent}");
        return Command::SUCCESS;
    }
}
