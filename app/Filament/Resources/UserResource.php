<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    
    protected static ?string $navigationLabel = 'Customers';
    
    protected static ?int $navigationSort = 1;
    
    protected static ?string $navigationGroup = 'Customer Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Full Name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->label('Email Address')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Forms\Components\TextInput::make('phone')
                    ->label('Phone Number')
                    ->tel()
                    ->maxLength(255),
                Forms\Components\TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->required(fn ($record) => $record === null)
                    ->dehydrated(fn ($state) => filled($state))
                    ->minLength(12)
                    ->maxLength(255)
                    ->helperText('Min 12 characters. Leave blank to keep current password'),
                    
                Forms\Components\Section::make('Role & Permissions')
                    ->schema([
                        Forms\Components\Toggle::make('is_admin')
                            ->label('Administrator')
                            ->helperText('Grant full admin panel access')
                            ->default(false),
                            
                        Forms\Components\Select::make('roles')
                            ->label('Spatie Roles')
                            ->multiple()
                            ->relationship('roles', 'name')
                            ->preload()
                            ->helperText('Assign Spatie permission roles'),
                            
                        Forms\Components\Select::make('role')
                            ->label('Legacy Role')
                            ->options([
                                'customer' => 'Customer',
                                'admin' => 'Administrator',
                                'moderator' => 'Moderator',
                            ])
                            ->default('customer')
                            ->required()
                            ->helperText('Legacy role field (kept for compatibility)'),
                            
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active Account')
                            ->default(true)
                            ->helperText('Inactive users cannot login'),
                    ])
                    ->columns(2),
                    
                Forms\Components\Toggle::make('email_verified_at')
                    ->label('Email Verified')
                    ->onIcon('heroicon-m-check')
                    ->offIcon('heroicon-m-x-mark')
                    ->default(false)
                    ->dehydrateStateUsing(fn ($state) => $state ? now() : null),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_admin')
                    ->label('Admin')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('roles.name')
                    ->label('Spatie Roles')
                    ->badge()
                    ->color('success')
                    ->separator(','),
                    
                Tables\Columns\BadgeColumn::make('role')
                    ->label('Legacy Role')
                    ->colors([
                        'danger' => 'admin',
                        'warning' => 'moderator',
                        'success' => 'customer',
                    ])
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\IconColumn::make('email_verified_at')
                    ->label('Verified')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('bookings_count')
                    ->label('Bookings')
                    ->counts('bookings')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Joined')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\Filter::make('verified')
                    ->label('Verified Only')
                    ->query(fn (Builder $query) => $query->whereNotNull('email_verified_at')),
                Tables\Filters\Filter::make('admin')
                    ->label('Admins Only')
                    ->query(fn (Builder $query) => $query->where('is_admin', true)),
                Tables\Filters\Filter::make('active')
                    ->label('Active Only')
                    ->query(fn (Builder $query) => $query->where('is_active', true)),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->requiresConfirmation()
                    ->modalHeading('Delete User')
                    ->modalDescription('Are you sure you want to delete this user? This action cannot be undone.')
                    ->successNotificationTitle('User deleted successfully'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->requiresConfirmation()
                        ->modalHeading('Delete Users')
                        ->modalDescription('Are you sure you want to delete selected users? This action cannot be undone.')
                        ->successNotificationTitle('Users deleted successfully'),
                        
                    // Bulk Export Users
                    Tables\Actions\BulkAction::make('export')
                        ->label('Export Selected')
                        ->icon('heroicon-o-arrow-down-tray')
                        ->color('success')
                        ->action(function ($records) {
                            $filename = 'users_export_' . now()->format('Y-m-d_His') . '.csv';
                            $headers = [
                                'Content-Type' => 'text/csv',
                                'Content-Disposition' => "attachment; filename=\"$filename\"",
                            ];
                            
                            $callback = function() use ($records) {
                                $file = fopen('php://output', 'w');
                                
                                // CSV Headers
                                fputcsv($file, [
                                    'ID',
                                    'Name',
                                    'Email',
                                    'Phone',
                                    'Roles',
                                    'Legacy Role',
                                    'Is Admin',
                                    'Is Active',
                                    'Email Verified',
                                    'Total Bookings',
                                    'Joined Date',
                                ]);
                                
                                // Data rows
                                foreach ($records as $record) {
                                    fputcsv($file, [
                                        $record->id,
                                        $record->name,
                                        $record->email,
                                        $record->phone ?? 'N/A',
                                        $record->roles->pluck('name')->join(', ') ?: 'N/A',
                                        ucfirst($record->role),
                                        $record->is_admin ? 'Yes' : 'No',
                                        $record->is_active ? 'Yes' : 'No',
                                        $record->email_verified_at ? 'Yes' : 'No',
                                        $record->bookings()->count(),
                                        $record->created_at->format('Y-m-d H:i'),
                                    ]);
                                }
                                
                                fclose($file);
                            };
                            
                            return response()->stream($callback, 200, $headers);
                        })
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation()
                        ->modalHeading('Export Users')
                        ->modalDescription('Export selected users to CSV file')
                        ->modalSubmitActionLabel('Download CSV'),
                        
                    // Bulk Activate/Deactivate
                    Tables\Actions\BulkAction::make('toggleActive')
                        ->label('Toggle Active Status')
                        ->icon('heroicon-o-arrow-path')
                        ->color('warning')
                        ->form([
                            Forms\Components\Select::make('is_active')
                                ->label('Status')
                                ->options([
                                    '1' => 'Active',
                                    '0' => 'Inactive',
                                ])
                                ->required(),
                        ])
                        ->action(fn ($records, $data) => 
                            $records->each->update(['is_active' => (bool)$data['is_active']])
                        )
                        ->deselectRecordsAfterCompletion()
                        ->successNotification(
                            \Filament\Notifications\Notification::make()
                                ->success()
                                ->title('User status updated successfully')
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
