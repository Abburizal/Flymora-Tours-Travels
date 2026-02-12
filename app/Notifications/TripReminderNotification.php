<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TripReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $booking;
    protected $daysUntilTrip;

    public function __construct(Booking $booking, int $daysUntilTrip)
    {
        $this->booking = $booking;
        $this->daysUntilTrip = $daysUntilTrip;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $tour = $this->booking->tour;
        $dashboardUrl = url('/dashboard');
        
        $subject = $this->daysUntilTrip === 1 
            ? '🎉 Your Trip is Tomorrow!' 
            : "🗓️ Your Trip is in {$this->daysUntilTrip} Days!";
        
        $greeting = $this->daysUntilTrip === 1
            ? 'Get ready! Your adventure starts tomorrow! 🎒'
            : "Your amazing trip is coming up in {$this->daysUntilTrip} days! 🌍";
        
        return (new MailMessage)
            ->subject($subject)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line($greeting)
            ->line('**Trip Details:**')
            ->line('📍 **Destination:** ' . $tour->destination)
            ->line('✈️ **Tour:** ' . $tour->name)
            ->line('🗓️ **Start Date:** ' . ($tour->start_date ? $tour->start_date->format('d F Y') : $this->booking->booking_date))
            ->line('⏱️ **Duration:** ' . $tour->duration)
            ->line('👥 **Group Size:** ' . $this->booking->number_of_participants . ' person(s)')
            ->line('')
            ->line('**Pre-Trip Checklist:**')
            ->line('✅ Check your passport and visa (if required)')
            ->line('✅ Pack appropriate clothing for the weather')
            ->line('✅ Bring necessary medications and toiletries')
            ->line('✅ Charge your camera and phone')
            ->line('✅ Print or save your e-ticket')
            ->action('View Full Itinerary', $dashboardUrl)
            ->line('Our team will contact you 24 hours before departure with final details.')
            ->line('')
            ->line('Questions? Feel free to reach out via WhatsApp or email.')
            ->line('Have an amazing trip! 🎉🌴');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'days_until_trip' => $this->daysUntilTrip,
        ];
    }
}
