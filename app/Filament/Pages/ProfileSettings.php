<?php

namespace App\Filament\Pages;

use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileSettings extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-user-circle';
    
    protected static ?string $navigationLabel = 'Profile Settings';
    
    protected static ?string $title = 'Profile Settings';
    
    protected static ?int $navigationSort = 99;
    
    protected static ?string $navigationGroup = 'System';

    protected static string $view = 'filament.pages.profile-settings';
    
    public ?array $profileData = [];
    
    public ?array $passwordData = [];

    public function mount(): void
    {
        $this->fillForms();
    }

    protected function fillForms(): void
    {
        $user = Auth::user();
        
        $this->profileData = [
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
        ];
        
        $this->passwordData = [
            'current_password' => '',
            'new_password' => '',
            'new_password_confirmation' => '',
        ];
    }

    protected function getForms(): array
    {
        return [
            'profileForm',
            'passwordForm',
        ];
    }

    public function profileForm(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Profile Information')
                    ->description('Update your account profile information.')
                    ->schema([
                        TextInput::make('name')
                            ->label('Full Name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        TextInput::make('phone')
                            ->label('Phone Number')
                            ->tel()
                            ->maxLength(255),
                    ])
                    ->columns(2),
            ])
            ->statePath('profileData');
    }

    public function passwordForm(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Update Password')
                    ->description('Ensure your account is using a long, random password to stay secure.')
                    ->schema([
                        TextInput::make('current_password')
                            ->label('Current Password')
                            ->password()
                            ->required()
                            ->currentPassword()
                            ->revealable(),
                        TextInput::make('new_password')
                            ->label('New Password')
                            ->password()
                            ->required()
                            ->minLength(12)
                            ->different('current_password')
                            ->revealable()
                            ->helperText('Minimum 12 characters. Use a mix of letters, numbers, and symbols.'),
                        TextInput::make('new_password_confirmation')
                            ->label('Confirm New Password')
                            ->password()
                            ->required()
                            ->same('new_password')
                            ->revealable(),
                    ])
                    ->columns(1),
            ])
            ->statePath('passwordData');
    }

    public function updateProfile(): void
    {
        $data = $this->profileForm->getState();
        
        $user = Auth::user();
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
        ]);

        Notification::make()
            ->title('Profile updated successfully')
            ->success()
            ->send();
    }

    public function updatePassword(): void
    {
        $data = $this->passwordForm->getState();
        
        $user = Auth::user();
        
        // Verify current password
        if (!Hash::check($data['current_password'], $user->password)) {
            Notification::make()
                ->title('Current password is incorrect')
                ->danger()
                ->send();
            return;
        }
        
        // Update password
        $user->update([
            'password' => Hash::make($data['new_password']),
        ]);

        // Reset password form
        $this->passwordData = [
            'current_password' => '',
            'new_password' => '',
            'new_password_confirmation' => '',
        ];

        Notification::make()
            ->title('Password updated successfully')
            ->success()
            ->body('Your password has been changed. Please use your new password for future logins.')
            ->send();
    }
}
