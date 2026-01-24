<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'destination',
        'image',
        'category_id',
        'max_participants',
        'booked_participants',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get available seats count
     */
    public function getAvailableSeatsAttribute()
    {
        return $this->max_participants - $this->booked_participants;
    }
}
