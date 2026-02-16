<?php

namespace App\Filament\Resources\TourResource\Pages;

use App\Filament\Resources\TourResource;
use App\Models\Tour;
use App\Models\Category;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Forms;
use Filament\Notifications\Notification;

class ListTours extends ListRecords
{
    protected static string $resource = TourResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
            
            // Import CSV Action
            Actions\Action::make('import')
                ->label('Import CSV')
                ->icon('heroicon-o-arrow-up-tray')
                ->color('info')
                ->form([
                    Forms\Components\FileUpload::make('file')
                        ->label('CSV File')
                        ->acceptedFileTypes(['text/csv', 'application/csv', 'text/plain'])
                        ->required()
                        ->helperText('Upload CSV file with columns: name, category, description, destination, price, duration'),
                ])
                ->action(function (array $data) {
                    $file = storage_path('app/public/' . $data['file']);
                    
                    if (!file_exists($file)) {
                        Notification::make()
                            ->danger()
                            ->title('File not found')
                            ->send();
                        return;
                    }
                    
                    $handle = fopen($file, 'r');
                    $header = fgetcsv($handle); // Skip header
                    
                    $imported = 0;
                    $errors = 0;
                    
                    while (($row = fgetcsv($handle)) !== false) {
                        try {
                            // Map CSV columns
                            $name = $row[0] ?? null;
                            $categoryName = $row[1] ?? null;
                            $description = $row[2] ?? null;
                            $destination = $row[3] ?? null;
                            $price = $row[4] ?? null;
                            $duration = $row[5] ?? null;
                            
                            if (!$name || !$categoryName || !$price || !$duration) {
                                $errors++;
                                continue;
                            }
                            
                            // Find or create category
                            $category = Category::firstOrCreate(
                                ['name' => $categoryName],
                                ['description' => 'Auto-created from import']
                            );
                            
                            // Create tour
                            Tour::create([
                                'name' => $name,
                                'category_id' => $category->id,
                                'description' => $description ?? 'Imported tour',
                                'destination' => $destination ?? $categoryName,
                                'price' => (float)str_replace([',', '.'], '', $price),
                                'duration' => (int)$duration,
                                'image' => 'tours/default.jpg', // Default image
                                'available_slots' => 20,
                                'max_participants' => 20,
                            ]);
                            
                            $imported++;
                        } catch (\Exception $e) {
                            $errors++;
                            \Log::error('Import error: ' . $e->getMessage());
                        }
                    }
                    
                    fclose($handle);
                    
                    // Clean up uploaded file
                    @unlink($file);
                    
                    Notification::make()
                        ->success()
                        ->title('Import completed')
                        ->body("Imported: {$imported} tours" . ($errors > 0 ? " | Errors: {$errors}" : ""))
                        ->send();
                }),
        ];
    }
}
