import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { FAQPageSchema } from '../components/Schema';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const faqs = [
        {
            question: "How do I book a tour?",
            answer: "To book a tour, browse our available tours, select your preferred tour, choose your travel dates, enter the number of participants, and proceed with the payment. You'll need to create an account or log in first."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods through Midtrans, including credit/debit cards (Visa, Mastercard), bank transfers, e-wallets (GoPay, OVO, Dana), and installment options."
        },
        {
            question: "Can I cancel or modify my booking?",
            answer: "Yes, you can cancel your booking up to 7 days before the tour start date for a full refund. Cancellations made within 7 days will receive a 50% refund. To modify your booking, please contact our customer service."
        },
        {
            question: "What's included in the tour price?",
            answer: "Tour prices typically include transportation, accommodation, entrance fees to attractions, guided tours, and some meals (breakfast). Specific inclusions vary by tour - please check the tour details page for complete information."
        },
        {
            question: "Do I need travel insurance?",
            answer: "While travel insurance is not mandatory, we strongly recommend it for your protection. It can cover trip cancellations, medical emergencies, lost luggage, and other unforeseen circumstances."
        },
        {
            question: "What is the minimum group size?",
            answer: "Most of our tours have a minimum group size of 4 participants and maximum of 20-30 participants. Private tours can be arranged for smaller groups at an additional cost."
        },
        {
            question: "Are meals included in the tour?",
            answer: "Meal inclusions vary by tour. Most tours include breakfast daily, and some include lunch or dinner. Please check the specific tour details for complete meal information."
        },
        {
            question: "What happens if the weather is bad?",
            answer: "Tours generally proceed rain or shine. However, if extreme weather conditions make the tour unsafe, we'll reschedule or offer a full refund. We'll contact you at least 24 hours in advance if changes are necessary."
        },
        {
            question: "Can I customize a tour itinerary?",
            answer: "Yes! We offer custom tour packages for groups. Contact our customer service team with your preferences, and we'll create a personalized itinerary tailored to your needs."
        },
        {
            question: "How do I leave a review after my tour?",
            answer: "After completing your tour, you can leave a review by logging into your account, going to your booking history, and clicking the 'Write Review' button on the completed tour."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <SEO 
                title="FAQ - Frequently Asked Questions"
                description="Find answers to common questions about booking tours with Tripin Travel. Learn about our booking process, payment methods, cancellation policy, travel insurance, and more."
                keywords="FAQ, frequently asked questions, tour booking help, travel questions, booking process, payment methods, cancellation policy, travel insurance"
                url="/faq"
            />
            <FAQPageSchema faqs={faqs} />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-blue-100">
                        Find answers to common questions about our tours and services
                    </p>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-800 pr-8">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-6 h-6 text-blue-600 transition-transform duration-200 flex-shrink-0 ${
                                            openIndex === index ? 'transform rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-200 ${
                                        openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                                    }`}
                                >
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-3 text-gray-800">
                            Still have questions?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Can't find the answer you're looking for? Please contact our customer support team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:info@flymoratours.com"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email Us
                            </a>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
