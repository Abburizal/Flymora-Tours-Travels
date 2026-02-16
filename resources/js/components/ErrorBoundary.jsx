import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { captureError } from '../sentry';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null, 
            errorInfo: null 
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('❌ ErrorBoundary caught error:', error);
        console.error('❌ Error info:', errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        
        // Send to Sentry
        captureError(error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: true,
        });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback 
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    onReset={this.handleReset}
                />
            );
        }

        return this.props.children;
    }
}

function ErrorFallback({ error, errorInfo, onReset }) {
    const { t } = useTranslation();
    const isDevelopment = import.meta.env.MODE === 'development';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <svg 
                            className="w-12 h-12 text-red-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
                    {t('error.somethingWrong', 'Oops! Something went wrong')}
                </h1>
                
                <p className="text-gray-600 text-center mb-8">
                    {t('error.unexpectedError', "We're sorry for the inconvenience. An unexpected error has occurred.")}
                </p>

                {/* Error Details (Development Only) */}
                {isDevelopment && error && (
                    <div className="mb-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="font-mono text-sm text-red-800 break-words">
                                <strong>Error:</strong> {error.toString()}
                            </p>
                        </div>
                        
                        {errorInfo && (
                            <details className="mb-4">
                                <summary className="cursor-pointer text-blue-600 hover:underline text-sm font-medium">
                                    Show component stack
                                </summary>
                                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-48">
                                    {errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        {t('error.refreshPage', 'Refresh Page')}
                    </button>
                    
                    <button
                        onClick={onReset}
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                    >
                        {t('error.tryAgain', 'Try Again')}
                    </button>
                    
                    <Link
                        to="/"
                        className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                    >
                        {t('error.backToHome', 'Back to Home')}
                    </Link>
                </div>

                {/* Support Info */}
                <div className="pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                        {t('error.persistsProblem', 'If the problem persists, please contact our support team.')}
                    </p>
                    <Link 
                        to="/contact" 
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                    >
                        {t('error.contactSupport', 'Contact Support')}
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorBoundary;
