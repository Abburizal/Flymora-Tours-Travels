<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;

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
    protected $description = 'Auto cancel expired pending bookings';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expired = Booking::where('status', 'pending')
            ->whereNotNull('expired_at')
            ->where('expired_at', '<', now())
            ->update(['status' => 'cancelled']);

        $this->info($expired . ' bookings have been expired and cancelled.');
        
        return Command::SUCCESS;
    }
}
