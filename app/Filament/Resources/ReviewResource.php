<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReviewResource\Pages;
use App\Models\Review;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ReviewResource extends Resource
{
    protected static ?string $model = Review::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';
    
    protected static ?string $navigationLabel = 'Reviews & Ratings';
    
    protected static ?int $navigationSort = 2;
    
    protected static ?string $navigationGroup = 'Customer Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('User')
                    ->relationship('user', 'name')
                    ->required()
                    ->disabled(),
                Forms\Components\Select::make('tour_id')
                    ->label('Tour')
                    ->relationship('tour', 'name')
                    ->required()
                    ->disabled(),
                Forms\Components\TextInput::make('rating')
                    ->label('Rating')
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(5)
                    ->suffix('/ 5')
                    ->required()
                    ->disabled(),
                Forms\Components\Textarea::make('comment')
                    ->label('Comment')
                    ->rows(4)
                    ->columnSpanFull()
                    ->disabled(),
                Forms\Components\Toggle::make('is_approved')
                    ->label('Approved')
                    ->helperText('Uncheck to hide this review from public')
                    ->default(true)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('User')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('tour.name')
                    ->label('Tour')
                    ->searchable()
                    ->sortable()
                    ->limit(30),
                Tables\Columns\TextColumn::make('rating')
                    ->label('Rating')
                    ->formatStateUsing(fn ($state) => str_repeat('⭐', $state))
                    ->sortable(),
                Tables\Columns\TextColumn::make('comment')
                    ->label('Comment')
                    ->limit(50)
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_approved')
                    ->label('Approved')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('rating')
                    ->options([
                        5 => '5 Stars',
                        4 => '4 Stars',
                        3 => '3 Stars',
                        2 => '2 Stars',
                        1 => '1 Star',
                    ]),
                Tables\Filters\TernaryFilter::make('is_approved')
                    ->label('Approval Status')
                    ->placeholder('All reviews')
                    ->trueLabel('Approved only')
                    ->falseLabel('Pending approval'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    // Bulk Export Reviews
                    Tables\Actions\BulkAction::make('export')
                        ->label('Export Selected')
                        ->icon('heroicon-o-arrow-down-tray')
                        ->color('success')
                        ->action(function ($records) {
                            $filename = 'reviews_export_' . now()->format('Y-m-d_His') . '.csv';
                            $headers = [
                                'Content-Type' => 'text/csv',
                                'Content-Disposition' => "attachment; filename=\"$filename\"",
                            ];
                            
                            $callback = function() use ($records) {
                                $file = fopen('php://output', 'w');
                                
                                // CSV Headers
                                fputcsv($file, [
                                    'ID',
                                    'User Name',
                                    'User Email',
                                    'Tour Name',
                                    'Rating',
                                    'Comment',
                                    'Status',
                                    'Created At',
                                ]);
                                
                                // Data rows
                                foreach ($records as $record) {
                                    fputcsv($file, [
                                        $record->id,
                                        $record->user->name ?? 'N/A',
                                        $record->user->email ?? 'N/A',
                                        $record->tour->name ?? 'N/A',
                                        $record->rating . '/5',
                                        $record->comment ?? 'No comment',
                                        ucfirst($record->status),
                                        $record->created_at->format('Y-m-d H:i'),
                                    ]);
                                }
                                
                                fclose($file);
                            };
                            
                            return response()->stream($callback, 200, $headers);
                        })
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation()
                        ->modalHeading('Export Reviews')
                        ->modalDescription('Export selected reviews to CSV file')
                        ->modalSubmitActionLabel('Download CSV'),
                        
                    // Bulk Approve
                    Tables\Actions\BulkAction::make('approve')
                        ->label('Approve Selected')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->action(fn ($records) => 
                            $records->each->update(['status' => 'approved'])
                        )
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation()
                        ->successNotification(
                            \Filament\Notifications\Notification::make()
                                ->success()
                                ->title('Reviews approved successfully')
                        ),
                        
                    // Bulk Reject
                    Tables\Actions\BulkAction::make('reject')
                        ->label('Reject Selected')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->action(fn ($records) => 
                            $records->each->update(['status' => 'rejected'])
                        )
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation()
                        ->successNotification(
                            \Filament\Notifications\Notification::make()
                                ->warning()
                                ->title('Reviews rejected')
                        ),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReviews::route('/'),
            'view' => Pages\ViewReview::route('/{record}'),
            'edit' => Pages\EditReview::route('/{record}/edit'),
        ];
    }
    
    public static function canCreate(): bool
    {
        return false; // Disable manual creation, only via API
    }
}
