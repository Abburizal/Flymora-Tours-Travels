<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $tour = $this->booking->tour;
        $paymentUrl = url('/dashboard');
        $hoursLeft = now()->diffInHours($this->booking->expired_at);
        
        return (new MailMessage)
            ->subject('⏰ Payment Reminder - Your Booking Expires Soon!')
            ->greeting('Hi ' . $notifiable->name . ',')
            ->line('This is a friendly reminder that your booking is waiting for payment.')
            ->line('**Booking Details:**')
            ->line('📍 **Tour:** ' . $tour->name)
            ->line('🗓️ **Date:** ' . $this->booking->booking_date)
            ->line('💰 **Amount:** Rp ' . number_format($this->booking->total_price, 0, ',', '.'))
            ->line('⏰ **Time Remaining:** ' . $hoursLeft . ' hours')
            ->action('Complete Payment Now', $paymentUrl)
            ->line('⚠️ **Your booking will expire at:** ' . $this->booking->expired_at->format('d M Y, H:i'))
            ->line('Don\'t miss out on this amazing trip! Complete your payment now to secure your spot.')
            ->line('')
            ->line('Need assistance? We\'re here to help via WhatsApp or email.')
            ->line('Thank you! 🙏');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'expires_at' => $this->booking->expired_at,
        ];
    }
}
