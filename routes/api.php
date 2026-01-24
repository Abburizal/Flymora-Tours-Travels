<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TourController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\MidtransCallbackController;

Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{id}', [TourController::class, 'show']);
Route::get('/bookings', [BookingController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/payments/{booking}', [PaymentController::class, 'create']);
Route::post('/payments', [PaymentController::class, 'pay']);

// Midtrans callback - NO AUTH REQUIRED
Route::post('/midtrans/callback', [MidtransCallbackController::class, 'handle'])->withoutMiddleware('api');

