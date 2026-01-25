import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: sectionId } });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleLinkClick = (path) => {
        navigate(path);
        // Smooth scroll to top after navigation
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img 
                                src="/images/logo.svg" 
                                alt="Flymora Tours and Travels" 
                                className="h-10"
                            />
                        </div>
                        <p className="text-gray-400">
                            Your trusted partner for unforgettable travel experiences around the world.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/tours')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Tours
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('about')} 
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/faq')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    FAQ
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/contact')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/terms-of-service')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Terms of Service
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleLinkClick('/privacy-policy')}
                                    className="text-gray-400 hover:text-white transition text-left"
                                >
                                    Privacy Policy
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <p className="text-gray-400">Email: info@flymoratours.com</p>
                        <p className="text-gray-400">Phone: +62 123 4567 890</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 Flymora Tours and Travels. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
