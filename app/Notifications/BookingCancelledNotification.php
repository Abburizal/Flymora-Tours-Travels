<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingCancelledNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $booking;
    protected $reason;

    public function __construct(Booking $booking, string $reason = 'payment_expired')
    {
        $this->booking = $booking;
        $this->reason = $reason;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $tour = $this->booking->tour;
        $toursUrl = url('/tours');
        $dashboardUrl = url('/dashboard');
        
        $reasonText = match($this->reason) {
            'payment_expired' => 'Your booking has expired due to non-payment within the required time.',
            'user_cancelled' => 'Your booking has been cancelled as requested.',
            'admin_cancelled' => 'Your booking has been cancelled by our team.',
            default => 'Your booking has been cancelled.',
        };
        
        $message = (new MailMessage)
            ->subject('❌ Booking Cancelled - ' . $tour->name)
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('We regret to inform you that your booking has been cancelled.')
            ->line('**Cancelled Booking Details:**')
            ->line('📍 **Destination:** ' . $tour->destination)
            ->line('✈️ **Tour:** ' . $tour->name)
            ->line('🗓️ **Date:** ' . $this->booking->booking_date)
            ->line('👥 **Participants:** ' . $this->booking->number_of_participants . ' person(s)')
            ->line('💰 **Amount:** Rp ' . number_format($this->booking->total_price, 0, ',', '.'))
            ->line('')
            ->line('**Reason:** ' . $reasonText);
        
        // Different actions based on reason
        if ($this->reason === 'payment_expired') {
            $message
                ->line('⏰ Your booking expired at: ' . $this->booking->expired_at->format('d M Y, H:i'))
                ->line('')
                ->line('**Don\'t worry!** You can book this tour again anytime.')
                ->line('💡 **Quick Tip:** Complete payment faster next time to secure your spot!')
                ->action('Book Again', $toursUrl . '/' . $tour->id);
        } else {
            $message
                ->line('')
                ->line('You can browse other amazing tours on our website.')
                ->action('Explore Tours', $toursUrl);
        }
        
        // Refund info if payment was made
        if ($this->booking->status === 'cancelled' && $this->reason === 'user_cancelled') {
            $message
                ->line('')
                ->line('💵 **Refund:** If you have already paid, your refund will be processed within 5-7 business days.');
        }
        
        $message
            ->line('')
            ->line('If you have any questions, please contact us via WhatsApp or email.')
            ->line('We hope to serve you again soon! 🌍');
            
        return $message;
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'tour_name' => $this->booking->tour->name,
            'reason' => $this->reason,
        ];
    }
}
