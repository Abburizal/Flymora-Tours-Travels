import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-xl text-blue-100">
                        Your privacy is important to us
                    </p>
                    <p className="text-sm text-blue-200 mt-4">
                        Last Updated: January 25, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
                    <div className="prose prose-blue max-w-none">
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Flymora Tours and Travels ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                When you register, book a tour, or contact us, we may collect:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Passport details (for international tours)</li>
                                <li>Emergency contact information</li>
                                <li>Payment information (processed securely through Midtrans)</li>
                                <li>Date of birth</li>
                                <li>Dietary requirements and medical conditions (if provided)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                When you visit our website, we automatically collect:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>IP address</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Pages visited and time spent</li>
                                <li>Referring website</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We use your information for the following purposes:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li><strong>Process bookings:</strong> To confirm and manage your tour reservations</li>
                                <li><strong>Payment processing:</strong> To facilitate secure payments through our payment partners</li>
                                <li><strong>Communication:</strong> To send booking confirmations, updates, and important travel information</li>
                                <li><strong>Customer support:</strong> To respond to your inquiries and provide assistance</li>
                                <li><strong>Marketing:</strong> To send promotional offers and newsletters (with your consent)</li>
                                <li><strong>Improve services:</strong> To analyze usage patterns and enhance user experience</li>
                                <li><strong>Legal compliance:</strong> To comply with legal obligations and prevent fraud</li>
                                <li><strong>Safety:</strong> To ensure the safety and security of our customers and staff</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We may share your information with trusted third-party service providers:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>Hotels and accommodation providers</li>
                                <li>Transportation companies</li>
                                <li>Activity and tour operators</li>
                                <li>Payment processors (Midtrans)</li>
                                <li>Email service providers</li>
                                <li>Analytics providers</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Legal Requirements</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We may disclose your information if required by law, court order, or government regulation, or to protect our rights and safety.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Business Transfers</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Data Security</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We implement appropriate technical and organizational measures to protect your personal information:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>SSL/TLS encryption for data transmission</li>
                                <li>Secure servers with restricted access</li>
                                <li>Regular security audits and updates</li>
                                <li>Employee training on data protection</li>
                                <li>Payment information is processed through PCI-DSS compliant payment gateways</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies and Tracking Technologies</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We use cookies and similar technologies to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>Remember your preferences and settings</li>
                                <li>Analyze website traffic and usage patterns</li>
                                <li>Provide personalized content and recommendations</li>
                                <li>Enable social media features</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Rights</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                                <li><strong>Objection:</strong> Object to processing of your data for marketing purposes</li>
                                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                                <li><strong>Withdraw consent:</strong> Withdraw consent for data processing at any time</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                To exercise these rights, please contact us at info@flymoratours.com
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Data Retention</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We retain your personal information for as long as necessary to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>Provide our services</li>
                                <li>Comply with legal, tax, and accounting requirements</li>
                                <li>Resolve disputes and enforce our agreements</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Typically, we retain booking and payment records for 7 years as required by Indonesian law.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Children's Privacy</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe we have collected information from your child, please contact us immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Third-Party Links</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. International Data Transfers</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Your information may be transferred to and processed in countries outside Indonesia. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Changes to This Privacy Policy</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed mb-2">
                                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-600"><strong>Email:</strong> privacy@flymoratours.com</p>
                                <p className="text-gray-600"><strong>Phone:</strong> +62 812 3456 7890</p>
                                <p className="text-gray-600"><strong>Address:</strong> Jl. Sudirman No. 123, Jakarta Pusat, 10220, Indonesia</p>
                            </div>
                        </section>

                    </div>

                    {/* Related Links */}
                    <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/terms-of-service"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Terms of Service →
                        </Link>
                        <Link
                            to="/faq"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            FAQ →
                        </Link>
                        <Link
                            to="/contact"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Contact Us →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
