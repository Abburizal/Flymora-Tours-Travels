<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Booking Configuration
    |--------------------------------------------------------------------------
    */

    'expiry_minutes' => env('BOOKING_EXPIRY_MINUTES', 30),

    'max_retries' => env('BOOKING_MAX_RETRIES', 5),

];
