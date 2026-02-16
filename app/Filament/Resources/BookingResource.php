<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Filament\Resources\BookingResource\RelationManagers;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';
    
    protected static ?string $navigationLabel = 'Bookings';
    
    protected static ?int $navigationSort = 2;
    
    protected static ?string $navigationGroup = 'Travel Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('User')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required()
                    ->reactive()
                    ->disabled(fn ($record) => $record !== null),
                    
                Forms\Components\Select::make('tour_id')
                    ->label('Tour')
                    ->relationship('tour', 'name')
                    ->searchable()
                    ->required()
                    ->reactive()
                    ->disabled(fn ($record) => $record !== null)
                    ->afterStateUpdated(function ($state, Forms\Set $set, Forms\Get $get) {
                        if ($state && $participants = $get('number_of_participants')) {
                            $tour = \App\Models\Tour::find($state);
                            if ($tour) {
                                $set('total_price', $tour->price * $participants);
                            }
                        }
                    }),
                    
                Forms\Components\DateTimePicker::make('booking_date')
                    ->label('Booking Date')
                    ->required()
                    ->default(now())
                    ->minDate(now())
                    ->native(false),
                    
                Forms\Components\TextInput::make('number_of_participants')
                    ->label('Participants')
                    ->required()
                    ->numeric()
                    ->minValue(1)
                    ->default(1)
                    ->reactive()
                    ->afterStateUpdated(function ($state, Forms\Set $set, Forms\Get $get) {
                        if ($state && $tourId = $get('tour_id')) {
                            $tour = \App\Models\Tour::find($tourId);
                            if ($tour) {
                                $set('total_price', $tour->price * $state);
                            }
                        }
                    }),
                    
                Forms\Components\TextInput::make('total_price')
                    ->label('Total Price')
                    ->required()
                    ->numeric()
                    ->prefix('Rp')
                    ->hint('Auto-calculated based on tour price × participants')
                    ->disabled()
                    ->dehydrated(false), // ✅ FIXED: Prevent manual price manipulation
                    
                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'paid' => 'Paid',
                        'cancelled' => 'Cancelled',
                        'completed' => 'Completed',
                    ])
                    ->default('pending')
                    ->required(),
                    
                Forms\Components\DateTimePicker::make('expired_at')
                    ->label('Expires At')
                    ->hint('Auto-set to 30 minutes from now')
                    ->default(fn () => now()->addMinutes(30))
                    ->native(false),
                    
                Forms\Components\Textarea::make('notes')
                    ->label('Notes')
                    ->columnSpanFull(),
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
                    ->sortable(),
                Tables\Columns\TextColumn::make('booking_date')
                    ->label('Booking Date')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('number_of_participants')
                    ->label('Participants')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_price')
                    ->label('Total Price')
                    ->money('IDR')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'confirmed',
                        'success' => 'paid',
                        'danger' => 'cancelled',
                        'primary' => 'completed',
                    ]),
                Tables\Columns\TextColumn::make('expired_at')
                    ->label('Expires At')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'paid' => 'Paid',
                        'cancelled' => 'Cancelled',
                        'completed' => 'Completed',
                    ]),
                    
                Tables\Filters\Filter::make('booking_date')
                    ->form([
                        Forms\Components\DatePicker::make('booked_from')
                            ->label('Booked From'),
                        Forms\Components\DatePicker::make('booked_until')
                            ->label('Booked Until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['booked_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('booking_date', '>=', $date),
                            )
                            ->when(
                                $data['booked_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('booking_date', '<=', $date),
                            );
                    }),
                    
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('Created From'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Created Until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }),
                    
                Tables\Filters\TernaryFilter::make('expired')
                    ->label('Expired Status')
                    ->placeholder('All bookings')
                    ->trueLabel('Expired only')
                    ->falseLabel('Active only')
                    ->queries(
                        true: fn (Builder $query): Builder => $query->where('expired_at', '<', now()),
                        false: fn (Builder $query): Builder => $query->where('expired_at', '>', now()),
                    ),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    // Bulk Export Bookings
                    Tables\Actions\BulkAction::make('export')
                        ->label('Export Selected')
                        ->icon('heroicon-o-arrow-down-tray')
                        ->color('success')
                        ->action(function ($records) {
                            $filename = 'bookings_export_' . now()->format('Y-m-d_His') . '.csv';
                            $headers = [
                                'Content-Type' => 'text/csv',
                                'Content-Disposition' => "attachment; filename=\"$filename\"",
                            ];
                            
                            $callback = function() use ($records) {
                                $file = fopen('php://output', 'w');
                                
                                // CSV Headers
                                fputcsv($file, [
                                    'ID',
                                    'Customer Name',
                                    'Customer Email',
                                    'Tour Name',
                                    'Booking Date',
                                    'Participants',
                                    'Total Price (IDR)',
                                    'Status',
                                    'Payment Status',
                                    'Created At',
                                    'Expired At',
                                ]);
                                
                                // Data rows
                                foreach ($records as $record) {
                                    fputcsv($file, [
                                        $record->id,
                                        $record->user->name ?? 'N/A',
                                        $record->user->email ?? 'N/A',
                                        $record->tour->name ?? 'N/A',
                                        $record->booking_date?->format('Y-m-d H:i'),
                                        $record->number_of_participants,
                                        number_format($record->total_price, 0, ',', '.'),
                                        ucfirst($record->status),
                                        ucfirst($record->payment_status ?? 'pending'),
                                        $record->created_at->format('Y-m-d H:i'),
                                        $record->expired_at?->format('Y-m-d H:i') ?? 'N/A',
                                    ]);
                                }
                                
                                fclose($file);
                            };
                            
                            return response()->stream($callback, 200, $headers);
                        })
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation()
                        ->modalHeading('Export Bookings')
                        ->modalDescription('Export selected bookings to CSV file')
                        ->modalSubmitActionLabel('Download CSV'),
                        
                    // Bulk Status Update
                    Tables\Actions\BulkAction::make('updateStatus')
                        ->label('Update Status')
                        ->icon('heroicon-o-check-circle')
                        ->color('warning')
                        ->form([
                            Forms\Components\Select::make('status')
                                ->label('New Status')
                                ->options([
                                    'pending' => 'Pending',
                                    'confirmed' => 'Confirmed',
                                    'paid' => 'Paid',
                                    'cancelled' => 'Cancelled',
                                    'completed' => 'Completed',
                                ])
                                ->required(),
                        ])
                        ->action(fn ($records, $data) => 
                            $records->each->update(['status' => $data['status']])
                        )
                        ->deselectRecordsAfterCompletion()
                        ->successNotification(
                            \Filament\Notifications\Notification::make()
                                ->success()
                                ->title('Status updated successfully')
                        ),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'view' => Pages\ViewBooking::route('/{record}'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
