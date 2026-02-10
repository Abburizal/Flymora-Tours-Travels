@props([
    'heading' => null,
    'subheading' => null,
])

<!-- Enhanced Login Page with Background - Single Root Element -->
<div {{ $attributes->class(['fi-simple-page relative min-h-screen flex items-center justify-center']) }}>
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/images/langit-malam.jpg');">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 w-full max-w-md px-4 py-8">
        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_PAGE_START, scopes: $this->getRenderHookScopes()) }}

        <section class="space-y-6">
            <!-- Enhanced Header with Tagline -->
            <div class="text-center mb-6">
                <x-filament-panels::header.simple
                    :heading="$heading ??= $this->getHeading()"
                    :logo="$this->hasLogo()"
                    :subheading="$subheading ??= $this->getSubHeading()"
                />
                <h2 class="text-white text-2xl font-bold mt-4 mb-2" style="text-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3);">Admin Control Panel</h2>
                <p class="text-white/90 text-sm" style="text-shadow: 0 2px 8px rgba(0,0,0,0.4);">Manage your tours & bookings</p>
            </div>

            <!-- Enhanced Card with Links Inside -->
            <div class="fi-simple-main-content-card border border-white/20">
                {{ $slot }}
                
                <!-- Links Inside Card for Better Visibility -->
                <div class="border-t border-gray-200 pt-6 pb-4 px-6 space-y-3 text-center bg-gray-50/50">
                    @if (filament()->hasPasswordReset())
                        <div>
                            <a href="{{ route('filament.admin.auth.password-reset.request') }}" class="text-blue-600 hover:text-blue-700 text-sm font-medium underline decoration-blue-400 hover:decoration-blue-600 transition">
                                Forgot your password?
                            </a>
                        </div>
                    @endif
                    <div>
                        <a href="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition group">
                            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                            Back to Website
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Footer Copyright -->
            <div class="text-center pt-4">
                <p class="text-white text-xs font-medium" style="text-shadow: 0 2px 8px rgba(0,0,0,0.6), 0 0 15px rgba(255,255,255,0.2);">
                    © {{ date('Y') }} Flymora Tours & Travels. All rights reserved.
                </p>
            </div>
        </section>

        @if (! $this instanceof \Filament\Tables\Contracts\HasTable)
            <x-filament-actions::modals />
        @endif

        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_PAGE_END, scopes: $this->getRenderHookScopes()) }}
    </div>
    
    <!-- Custom Styles for Enhanced Login -->
    <style>
        /* Enhanced card with dramatic shadow and glow */
        .fi-simple-main-content-card {
            box-shadow: 
                0 40px 60px -15px rgba(0, 0, 0, 0.5),
                0 20px 30px -10px rgba(0, 0, 0, 0.4),
                0 0 60px rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(16px);
            background: rgba(255, 255, 255, 0.98) !important;
            border-radius: 1rem !important;
            overflow: hidden;
        }
        
        /* Logo enhancement with stronger shadow */
        .fi-simple-page img {
            filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
        }
        
        /* Smooth animations */
        .fi-simple-main-content-card {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Heading glow effect */
        .fi-simple-page h2 {
            animation: fadeIn 0.8s ease-out 0.2s both;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    </style>
</div>
