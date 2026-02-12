<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingConfirmationNotification extends Notification implements ShouldQueue
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
        $bookingUrl = url('/dashboard');
        
        return (new MailMessage)
            ->subject('✅ Booking Confirmation - ' . $tour->name)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Your booking has been successfully created!')
            ->line('**Tour Details:**')
            ->line('📍 **Destination:** ' . $tour->destination)
            ->line('🗓️ **Date:** ' . $this->booking->booking_date)
            ->line('👥 **Participants:** ' . $this->booking->number_of_participants . ' person(s)')
            ->line('💰 **Total Price:** Rp ' . number_format($this->booking->total_price, 0, ',', '.'))
            ->line('**Booking Status:** ' . strtoupper($this->booking->status))
            ->action('View My Booking', $bookingUrl)
            ->line('⚠️ **Important:** Please complete your payment within 24 hours to secure your booking.')
            ->line('Your booking will automatically expire if payment is not received.')
            ->line('')
            ->line('Need help? Contact us via WhatsApp or email.')
            ->line('Thank you for choosing Flymora Tours & Travels! 🌍');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'tour_name' => $this->booking->tour->name,
            'status' => $this->booking->status,
        ];
    }
}
