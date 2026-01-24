<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'tour_id',
        'booking_date',
        'number_of_participants',
        'total_price',
        'status',
        'notes',
        'expired_at',
    ];

    protected $casts = [
        'booking_date' => 'datetime',
        'expired_at' => 'datetime',
        'total_price' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
