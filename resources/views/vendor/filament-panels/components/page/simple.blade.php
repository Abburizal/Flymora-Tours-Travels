@props([
    'heading' => null,
    'subheading' => null,
])

<!-- Enhanced Login Page - Clean Design with Logo - Single Root Element -->
<div {{ $attributes->class(['fi-simple-page relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100']) }}>
    
    <!-- Content -->
    <div class="relative z-10 w-full max-w-md px-4 py-8">
        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_PAGE_START, scopes: $this->getRenderHookScopes()) }}

        <section class="space-y-6">
            <!-- Enhanced Header with Logo -->
            <div class="text-center mb-8">
                <!-- Flymora Logo -->
                <div class="mb-6">
                    <img src="/images/flymora-logo.png" alt="Flymora Tours & Travels" class="mx-auto h-20 w-auto">
                </div>
                
                <x-filament-panels::header.simple
                    :heading="$heading ??= $this->getHeading()"
                    :logo="false"
                    :subheading="$subheading ??= $this->getSubHeading()"
                />
                <h2 class="text-gray-800 text-2xl font-bold mt-4 mb-2">Admin Control Panel</h2>
                <p class="text-gray-600 text-sm">Manage your tours & bookings</p>
            </div>

            <!-- Enhanced Card with Links Inside -->
            <div class="fi-simple-main-content-card border border-gray-200">
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
                <p class="text-gray-600 text-xs font-medium">
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
        /* Enhanced card with clean shadow */
        .fi-simple-main-content-card {
            box-shadow: 
                0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
            background: white !important;
            border-radius: 1rem !important;
            overflow: hidden;
        }
        
        /* Logo enhancement */
        .fi-simple-page img {
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
            transition: transform 0.3s ease;
        }
        
        .fi-simple-page img:hover {
            transform: scale(1.05);
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
        
        /* Heading fade in */
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
