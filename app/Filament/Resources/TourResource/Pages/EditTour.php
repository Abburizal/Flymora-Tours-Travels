<?php

namespace App\Filament\Resources\TourResource\Pages;

use App\Filament\Resources\TourResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;

class EditTour extends EditRecord
{
    protected static string $resource = TourResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function beforeSave(): void
    {
        // Validate that file uploads have completed
        $data = $this->data;
        
        // Check if custom_itinerary is being uploaded but path is empty
        if (isset($data['custom_itinerary']) && empty($data['custom_itinerary'])) {
            Notification::make()
                ->warning()
                ->title('Upload in progress')
                ->body('Please wait for file uploads to complete before saving.')
                ->send();
            
            $this->halt();
        }
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Tour updated successfully';
    }
}
