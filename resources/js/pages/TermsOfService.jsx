import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-xl text-blue-100">
                        Please read these terms carefully before using our services
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                By accessing and using Flymora Tours and Travels ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Booking and Payment</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Booking Process</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                All bookings must be made through our website or authorized agents. A booking is confirmed only after full payment has been received and a confirmation email has been sent to you.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Payment Terms</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>Full payment is required at the time of booking</li>
                                <li>All prices are in Indonesian Rupiah (IDR)</li>
                                <li>We accept credit/debit cards, bank transfers, and e-wallets through Midtrans</li>
                                <li>Payment must be completed within 24 hours of booking initiation</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cancellation and Refund Policy</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Cancellation by Customer</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li><strong>More than 14 days before departure:</strong> Full refund minus 10% administrative fee</li>
                                <li><strong>7-14 days before departure:</strong> 50% refund</li>
                                <li><strong>Less than 7 days before departure:</strong> No refund</li>
                                <li><strong>No-show:</strong> No refund</li>
                            </ul>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Cancellation by Flymora</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We reserve the right to cancel any tour due to insufficient bookings, natural disasters, or other unforeseen circumstances. In such cases, you will receive a full refund or the option to reschedule.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Travel Documents and Insurance</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Travel Documents</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You are responsible for ensuring you have valid passports, visas, and any other required travel documents. Flymora is not responsible for any costs incurred due to invalid or missing documents.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Travel Insurance</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We strongly recommend purchasing comprehensive travel insurance. Flymora is not liable for any medical expenses, lost luggage, or other incidents during your tour.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Liability and Responsibilities</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Our Liability</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Flymora acts only as an agent for various service providers including hotels, airlines, and activity providers. We are not liable for any loss, injury, or damage arising from services provided by third parties.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Your Responsibilities</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>Follow all instructions from tour guides and local authorities</li>
                                <li>Respect local customs and laws</li>
                                <li>Take care of personal belongings</li>
                                <li>Inform us of any medical conditions or special requirements</li>
                                <li>Arrive on time for all scheduled activities</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Changes to Itinerary</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We reserve the right to alter tour itineraries due to weather conditions, safety concerns, or other circumstances beyond our control. We will make every effort to provide comparable alternatives.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Health and Fitness</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Some tours require a reasonable level of fitness. You must inform us of any medical conditions that may affect your ability to participate. We reserve the right to refuse participation if we believe your health or fitness may pose a risk to yourself or others.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                All content on this website, including text, graphics, logos, and images, is the property of Flymora Tours and Travels and protected by copyright laws. Unauthorized use is prohibited.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                These Terms of Service are governed by the laws of the Republic of Indonesia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Jakarta.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of any changes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-2">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-600"><strong>Email:</strong> info@flymoratours.com</p>
                                <p className="text-gray-600"><strong>Phone:</strong> +62 812 3456 7890</p>
                                <p className="text-gray-600"><strong>Address:</strong> Jl. Sudirman No. 123, Jakarta Pusat, 10220, Indonesia</p>
                            </div>
                        </section>

                    </div>

                    {/* Related Links */}
                    <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/privacy-policy"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Privacy Policy →
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
