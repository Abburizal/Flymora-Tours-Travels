<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Log contact form submission
        Log::info('Contact Form Submission', [
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? 'N/A',
            'subject' => $data['subject'],
            'message' => $data['message'],
            'timestamp' => now(),
        ]);

        // TODO: Send email notification to admin
        // Mail::to(config('mail.contact_email', 'info@flymoratours.com'))
        //     ->send(new ContactFormSubmitted($data));

        return response()->json([
            'success' => true,
            'message' => 'Thank you for contacting us! We will get back to you soon.'
        ]);
    }
}
