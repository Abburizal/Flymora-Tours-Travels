<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeSubscriberMail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = strtolower(trim($request->email));

        $existing = NewsletterSubscriber::where('email', $email)->first();

        if ($existing) {
            if ($existing->status === 'active') {
                return response()->json([
                    'success' => false,
                    'message' => 'This email is already subscribed to our newsletter.'
                ], 409);
            }

            $existing->resubscribe();

            Mail::to($existing->email)->queue(new WelcomeSubscriberMail($existing));

            return response()->json([
                'success' => true,
                'message' => 'Welcome back! You have been resubscribed to our newsletter.',
                'data' => [
                    'email' => $existing->email,
                    'subscribed_at' => $existing->subscribed_at
                ]
            ], 200);
        }

        $subscriber = NewsletterSubscriber::create([
            'email' => $email,
            'status' => 'active',
            'subscribed_at' => now(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        Mail::to($subscriber->email)->queue(new WelcomeSubscriberMail($subscriber));

        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing! Please check your email for confirmation.',
            'data' => [
                'email' => $subscriber->email,
                'subscribed_at' => $subscriber->subscribed_at
            ]
        ], 201);
    }

    public function unsubscribe($token)
    {
        $subscriber = NewsletterSubscriber::where('token', $token)->first();

        if (!$subscriber) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid unsubscribe token.'
            ], 404);
        }

        if ($subscriber->status === 'unsubscribed') {
            return response()->json([
                'success' => false,
                'message' => 'This email is already unsubscribed.'
            ], 409);
        }

        $subscriber->unsubscribe();

        return response()->json([
            'success' => true,
            'message' => 'You have been successfully unsubscribed from our newsletter.',
            'data' => [
                'email' => $subscriber->email,
                'unsubscribed_at' => $subscriber->unsubscribed_at
            ]
        ], 200);
    }

    public function checkStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $subscriber = NewsletterSubscriber::where('email', strtolower(trim($request->email)))->first();

        if (!$subscriber) {
            return response()->json([
                'success' => true,
                'data' => [
                    'subscribed' => false,
                    'status' => null
                ]
            ], 200);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'subscribed' => $subscriber->status === 'active',
                'status' => $subscriber->status,
                'subscribed_at' => $subscriber->subscribed_at,
                'unsubscribed_at' => $subscriber->unsubscribed_at
            ]
        ], 200);
    }
}
