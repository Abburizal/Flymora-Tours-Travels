<x-filament-panels::page>
    <div class="space-y-6">
        {{-- Profile Information Section --}}
        <x-filament::section>
            <x-slot name="heading">
                <div class="flex items-center gap-x-3">
                    <x-filament::icon
                        icon="heroicon-o-user-circle"
                        class="h-6 w-6 text-gray-500 dark:text-gray-400"
                    />
                    <span class="text-lg font-semibold">Profile Information</span>
                </div>
            </x-slot>

            <form wire:submit="updateProfile">
                {{ $this->profileForm }}

                <div class="mt-6 flex justify-end">
                    <x-filament::button type="submit">
                        Save Profile
                    </x-filament::button>
                </div>
            </form>
        </x-filament::section>

        {{-- Password Update Section --}}
        <x-filament::section>
            <x-slot name="heading">
                <div class="flex items-center gap-x-3">
                    <x-filament::icon
                        icon="heroicon-o-lock-closed"
                        class="h-6 w-6 text-gray-500 dark:text-gray-400"
                    />
                    <span class="text-lg font-semibold">Update Password</span>
                </div>
            </x-slot>

            <form wire:submit="updatePassword">
                {{ $this->passwordForm }}

                <div class="mt-6 flex justify-end">
                    <x-filament::button type="submit" color="danger">
                        Update Password
                    </x-filament::button>
                </div>
            </form>
        </x-filament::section>

        {{-- Account Information --}}
        <x-filament::section>
            <x-slot name="heading">
                <div class="flex items-center gap-x-3">
                    <x-filament::icon
                        icon="heroicon-o-information-circle"
                        class="h-6 w-6 text-gray-500 dark:text-gray-400"
                    />
                    <span class="text-lg font-semibold">Account Information</span>
                </div>
            </x-slot>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                        <x-filament::badge color="danger">
                            {{ auth()->user()->getRoleName() }}
                        </x-filament::badge>
                    </dd>
                </div>

                <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                        <x-filament::badge color="success">
                            {{ auth()->user()->is_active ? 'Active' : 'Inactive' }}
                        </x-filament::badge>
                    </dd>
                </div>

                <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verified</dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                        <x-filament::badge :color="auth()->user()->email_verified_at ? 'success' : 'warning'">
                            {{ auth()->user()->email_verified_at ? 'Verified' : 'Not Verified' }}
                        </x-filament::badge>
                    </dd>
                </div>

                <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                        {{ auth()->user()->created_at->format('d M Y') }}
                    </dd>
                </div>
            </div>
        </x-filament::section>
    </div>
</x-filament-panels::page>
