@props([
    'heading' => null,
    'subheading' => null,
])

<!-- Enhanced Login Page with Background -->
<div class="relative min-h-screen">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/images/langit-malam.jpg');">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80"></div>
    </div>
    
    <!-- Content -->
    <div {{ $attributes->class(['fi-simple-page relative z-10']) }}>
        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_PAGE_START, scopes: $this->getRenderHookScopes()) }}

        <section class="grid auto-cols-fr gap-y-6">
            <!-- Enhanced Header with Tagline -->
            <div class="text-center mb-4">
                <x-filament-panels::header.simple
                    :heading="$heading ??= $this->getHeading()"
                    :logo="$this->hasLogo()"
                    :subheading="$subheading ??= $this->getSubHeading()"
                />
                <p class="text-white/90 text-sm mt-2 drop-shadow-lg font-medium">Admin Control Panel</p>
                <p class="text-white/70 text-xs mt-1 drop-shadow">Manage your tours & bookings</p>
            </div>

            <!-- Enhanced Card -->
            <div class="fi-simple-main-content-card border border-gray-200/50">
                {{ $slot }}
            </div>
            
            <!-- Forgot Password & Back to Website Links -->
            <div class="text-center space-y-3 mt-2">
                @if (filament()->hasPasswordReset())
                    <a href="{{ route('filament.admin.auth.password-reset.request') }}" class="text-white/80 hover:text-white text-sm underline decoration-white/40 hover:decoration-white transition drop-shadow">
                        Forgot your password?
                    </a>
                @endif
                <div>
                    <a href="/" class="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs transition drop-shadow">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Back to Website
                    </a>
                </div>
            </div>
            
            <!-- Footer Copyright -->
            <div class="text-center mt-8 pb-6">
                <p class="text-white/60 text-xs drop-shadow">
                    © {{ date('Y') }} Flymora Tours & Travels. All rights reserved.
                </p>
            </div>
        </section>

        @if (! $this instanceof \Filament\Tables\Contracts\HasTable)
            <x-filament-actions::modals />
        @endif

        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_PAGE_END, scopes: $this->getRenderHookScopes()) }}
    </div>
</div>

<!-- Custom Styles for Enhanced Login -->
<style>
    /* Enhanced card shadow and styling */
    .fi-simple-main-content-card {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2) !important;
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.98) !important;
    }
    
    /* Ensure proper spacing and centering */
    .fi-simple-page {
        padding: 2rem 1rem;
    }
    
    /* Logo enhancement */
    .fi-simple-page img {
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }
</style>
