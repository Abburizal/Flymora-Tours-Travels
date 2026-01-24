<?php

namespace App\Services;

class PaymentService
{
    public static function pay($booking)
    {
        // Integrasi gateway di sini
        return [
            'status' => 'redirect',
            'url' => 'https://payment-gateway.example'
        ];
    }
}
