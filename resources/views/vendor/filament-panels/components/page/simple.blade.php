@props([
    'heading' => null,
    'subheading' => null,
])

<!-- Flymora Admin Login - Premium Enterprise UI -->
<div {{ $attributes->class(['flymora-admin-login relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden']) }}>
    
    <!-- Enhanced Background with Subtle Pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
    <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(circle at 2px 2px, rgba(30, 58, 138, 0.05) 1px, transparent 0); background-size: 32px 32px;"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
    
    <!-- Login Container -->
    <div class="relative z-10 w-full max-w-[460px]">
        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_PAGE_START, scopes: $this->getRenderHookScopes()) }}

        <!-- Brand Header -->
        <header class="text-center mb-10 animate-fade-in">
            <!-- Logo with Brand Accent -->
            <div class="relative inline-block mb-7">
                <div class="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
                <img 
                    src="/images/flymora-logo.png" 
                    alt="Flymora Tours & Travels" 
                    class="relative h-24 w-auto mx-auto transform transition-all duration-300 hover:scale-105 filter drop-shadow-lg"
                >
            </div>
            
            <x-filament-panels::header.simple
                :heading="$heading ??= $this->getHeading()"
                :logo="false"
                :subheading="$subheading ??= $this->getSubHeading()"
            />
            
            <!-- Brand Accent Line -->
            <div class="flex items-center justify-center gap-3 mb-5">
                <div class="h-px w-12 bg-gradient-to-r from-transparent to-slate-300"></div>
                <div class="h-1 w-1 rounded-full bg-[#d97706]"></div>
                <div class="h-px w-12 bg-gradient-to-l from-transparent to-slate-300"></div>
            </div>
            
            <h1 class="text-3xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
                Admin Control Panel
            </h1>
            <p class="text-sm text-slate-600 font-medium leading-relaxed">
                Secure access to manage tours, bookings & operations
            </p>
            
            <!-- Security Badge -->
            <div class="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/60 rounded-full shadow-sm">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs font-semibold text-emerald-700">Secured Connection</span>
            </div>
        </header>

        <!-- Login Form - Clean Minimalist Design -->
        <main class="login-form animate-slide-up">
            <!-- Form Content -->
            <div class="px-4 py-8">
                {{ $slot }}
            </div>
            
            <!-- Links Section -->
            <footer class="px-4 py-6 space-y-4">
                @if (filament()->hasPasswordReset())
                    <div class="text-center">
                        <a 
                            href="{{ route('filament.admin.auth.password-reset.request') }}" 
                            class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e3a8a] hover:text-[#d97706] transition-all duration-200 group"
                        >
                            <svg class="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                            </svg>
                            Forgot your password?
                        </a>
                    </div>
                @endif
                
                <div class="text-center pt-2">
                    <a 
                        href="/" 
                        class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-200 group"
                    >
                        <svg class="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Back to Website
                    </a>
                </div>
            </footer>
        </main>
        
        <!-- Footer -->
        <div class="text-center mt-8 animate-fade-in-delayed">
            <p class="text-xs text-slate-500 font-medium">
                © {{ date('Y') }} Flymora Tours & Travels. All rights reserved.
            </p>
            <p class="text-xs text-slate-400 mt-1">
                Protected by enterprise-grade security
            </p>
        </div>

        @if (! $this instanceof \Filament\Tables\Contracts\HasTable)
            <x-filament-actions::modals />
        @endif

        {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::SIMPLE_PAGE_END, scopes: $this->getRenderHookScopes()) }}
    </div>
    
    <!-- Clean Minimalist Admin Login Styles -->
    <style>
        /* === Brand Color System === */
        :root {
            --flymora-navy: #1e3a8a;
            --flymora-navy-light: #2563eb;
            --flymora-gold: #d97706;
            --flymora-gold-light: #f59e0b;
        }
        
        /* === Login Form - No Card, No Shadows === */
        .login-form {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* === Input Fields - Clean Minimal Style === */
        .flymora-admin-login input[type="email"],
        .flymora-admin-login input[type="password"],
        .flymora-admin-login input[type="text"] {
            box-shadow: none !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 0.5rem !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            font-size: 0.9375rem !important;
            padding: 0.75rem 1rem !important;
            background-color: #ffffff !important;
            line-height: 1.5 !important;
        }
        
        .flymora-admin-login input[type="email"]:hover,
        .flymora-admin-login input[type="password"]:hover,
        .flymora-admin-login input[type="text"]:hover {
            border-color: #cbd5e1 !important;
        }
        
        .flymora-admin-login input[type="email"]:focus,
        .flymora-admin-login input[type="password"]:focus,
        .flymora-admin-login input[type="text"]:focus {
            box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1) !important;
            border-color: var(--flymora-navy) !important;
            outline: none !important;
        }
        
        /* === Form Labels === */
        .flymora-admin-login label {
            font-weight: 600 !important;
            font-size: 0.875rem !important;
            color: #334155 !important;
            letter-spacing: -0.01em !important;
            margin-bottom: 0.5rem !important;
        }
        
        /* === Primary Button - Clean Style === */
        .flymora-admin-login button[type="submit"],
        .flymora-admin-login .fi-btn-primary {
            background: linear-gradient(135deg, var(--flymora-navy) 0%, #1e40af 100%) !important;
            border: none !important;
            box-shadow: none !important;
            font-weight: 600 !important;
            letter-spacing: 0.025em !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            border-radius: 0.5rem !important;
            padding: 0.75rem 1.5rem !important;
        }
        
        .flymora-admin-login button[type="submit"]:hover:not(:disabled),
        .flymora-admin-login .fi-btn-primary:hover:not(:disabled) {
            background: linear-gradient(135deg, #1e40af 0%, var(--flymora-navy) 100%) !important;
            opacity: 0.9 !important;
        }
        
        .flymora-admin-login button[type="submit"]:active:not(:disabled),
        .flymora-admin-login .fi-btn-primary:active:not(:disabled) {
            opacity: 0.8 !important;
        }
        
        /* === Button Loading State === */
        .flymora-admin-login button[type="submit"]:disabled,
        .flymora-admin-login .fi-btn-primary:disabled {
            opacity: 0.6 !important;
            cursor: not-allowed !important;
        }
        
        /* === Checkbox Styling === */
        .flymora-admin-login input[type="checkbox"] {
            border-radius: 0.25rem !important;
            border: 1px solid #cbd5e1 !important;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: pointer !important;
        }
        
        .flymora-admin-login input[type="checkbox"]:hover {
            border-color: #94a3b8 !important;
        }
        
        .flymora-admin-login input[type="checkbox"]:checked {
            background-color: var(--flymora-navy) !important;
            border-color: var(--flymora-navy) !important;
        }
        
        .flymora-admin-login input[type="checkbox"]:focus {
            box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1) !important;
            border-color: var(--flymora-navy) !important;
        }
        
        /* === Password Toggle Icon === */
        .flymora-admin-login button[type="button"] {
            color: #64748b !important;
            transition: all 0.2s ease !important;
        }
        
        .flymora-admin-login button[type="button"]:hover {
            color: var(--flymora-navy) !important;
        }
        
        /* === Error States === */
        .flymora-admin-login .fi-fo-field-wrp-error-message {
            color: #dc2626 !important;
            font-size: 0.8125rem !important;
            font-weight: 500 !important;
            margin-top: 0.5rem !important;
        }
        
        .flymora-admin-login .fi-input-wrp-error input {
            border-color: #dc2626 !important;
        }
        
        .flymora-admin-login .fi-input-wrp-error input:focus {
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
        }
        
        /* === Smooth Animations === */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in-delayed {
            animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }
        
        .animate-slide-up {
            animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both;
        }
        
        /* === Responsive Improvements === */
        @media (max-width: 640px) {
            .flymora-admin-login input[type="email"],
            .flymora-admin-login input[type="password"],
            .flymora-admin-login input[type="text"] {
                font-size: 16px !important; /* Prevent zoom on iOS */
            }
        }
        
        /* === Focus Visible for Accessibility === */
        .flymora-admin-login a:focus-visible,
        .flymora-admin-login button:focus-visible,
        .flymora-admin-login input:focus-visible {
            outline: 2px solid var(--flymora-navy) !important;
            outline-offset: 2px !important;
        }
    </style>
</div>
