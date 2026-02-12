<?php

namespace App\Filament\Resources\TourResource\Pages;

use App\Filament\Resources\TourResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;

class CreateTour extends CreateRecord
{
    protected static string $resource = TourResource::class;

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Tour created successfully';
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
