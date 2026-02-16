<?php

namespace App\Filament\Resources\CategoryResource\Pages;

use App\Filament\Resources\CategoryResource;
use App\Models\Category;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Forms;
use Filament\Notifications\Notification;

class ListCategories extends ListRecords
{
    protected static string $resource = CategoryResource::class;

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
                        ->helperText('Upload CSV file with columns: name, description'),
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
                            $name = $row[0] ?? null;
                            $description = $row[1] ?? null;
                            
                            if (!$name) {
                                $errors++;
                                continue;
                            }
                            
                            Category::firstOrCreate(
                                ['name' => $name],
                                ['description' => $description ?? '']
                            );
                            
                            $imported++;
                        } catch (\Exception $e) {
                            $errors++;
                            \Log::error('Import error: ' . $e->getMessage());
                        }
                    }
                    
                    fclose($handle);
                    @unlink($file);
                    
                    Notification::make()
                        ->success()
                        ->title('Import completed')
                        ->body("Imported: {$imported} categories" . ($errors > 0 ? " | Errors: {$errors}" : ""))
                        ->send();
                }),
                
            // Export CSV Action
            Actions\Action::make('export')
                ->label('Export All')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->action(function () {
                    $filename = 'categories_export_' . now()->format('Y-m-d_His') . '.csv';
                    $headers = [
                        'Content-Type' => 'text/csv',
                        'Content-Disposition' => "attachment; filename=\"$filename\"",
                    ];
                    
                    $callback = function() {
                        $file = fopen('php://output', 'w');
                        fputcsv($file, ['ID', 'Name', 'Description', 'Tours Count', 'Created At']);
                        
                        Category::with('tours')->get()->each(function ($category) use ($file) {
                            fputcsv($file, [
                                $category->id,
                                $category->name,
                                $category->description,
                                $category->tours->count(),
                                $category->created_at->format('Y-m-d H:i'),
                            ]);
                        });
                        
                        fclose($file);
                    };
                    
                    return response()->stream($callback, 200, $headers);
                }),
        ];
    }
}
