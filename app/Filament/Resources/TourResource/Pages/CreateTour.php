<?php

namespace App\Filament\Resources\TourResource\Pages;

use App\Filament\Resources\TourResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;

class CreateTour extends CreateRecord
{
    protected static string $resource = TourResource::class;

    protected function beforeCreate(): void
    {
        // Validate that file uploads have completed
        $data = $this->data;
        
        // Check if files are being uploaded but paths are empty
        if (isset($data['custom_itinerary']) && empty($data['custom_itinerary'])) {
            Notification::make()
                ->warning()
                ->title('Upload in progress')
                ->body('Please wait for file uploads to complete before saving.')
                ->send();
            
            $this->halt();
        }
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Tour created successfully';
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
