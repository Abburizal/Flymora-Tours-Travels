import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
    const { t } = useTranslation();
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('footer.terms')}</h1>
                    <p className="text-xl text-blue-100">
                        {t('terms.readCarefully')}
                    </p>
                    <p className="text-sm text-blue-200 mt-4">
                        {t('terms.lastUpdated')}: January 25, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
                    <div className="prose prose-blue max-w-none">
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. {t('terms.acceptance')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.acceptanceText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. {t('terms.bookingAndPayment')}</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 {t('terms.bookingProcess')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.bookingProcessText')}
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 {t('terms.paymentTerms')}</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('terms.fullPaymentRequired')}</li>
                                <li>{t('terms.pricesInIDR')}</li>
                                <li>{t('terms.acceptedPaymentMethods')}</li>
                                <li>{t('terms.paymentDeadline')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. {t('terms.cancellationAndRefund')}</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 {t('terms.cancellationByCustomer')}</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('terms.moreThan14Days')}</li>
                                <li>{t('terms.sevenTo14Days')}</li>
                                <li>{t('terms.lessThan7Days')}</li>
                                <li>{t('terms.noShow')}</li>
                            </ul>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 {t('terms.cancellationByFlymora')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.cancellationByFlymoraText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. {t('terms.travelDocumentsAndInsurance')}</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 {t('terms.travelDocuments')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.travelDocumentsText')}
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 {t('terms.travelInsurance')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.travelInsuranceText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. {t('terms.liabilityAndResponsibilities')}</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 {t('terms.ourLiability')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.ourLiabilityText')}
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 {t('terms.yourResponsibilities')}</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('terms.followInstructions')}</li>
                                <li>{t('terms.respectLaws')}</li>
                                <li>{t('terms.takeCareOfBelongings')}</li>
                                <li>{t('terms.informOfConditions')}</li>
                                <li>{t('terms.arriveOnTime')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. {t('terms.changesToItinerary')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.changesToItineraryText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. {t('terms.healthAndFitness')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.healthAndFitnessText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. {t('terms.intellectualProperty')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.intellectualPropertyText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. {t('terms.governingLaw')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.governingLawText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. {t('terms.changesToTerms')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('terms.changesToTermsText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. {t('footer.contact')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-2">
                                {t('terms.contactQuestions')}
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-600"><strong>{t('contact.email')}:</strong> info@flymoratours.com</p>
                                <p className="text-gray-600"><strong>{t('contact.phone')}:</strong> +62 812 3456 7890</p>
                                <p className="text-gray-600"><strong>{t('contact.office')}:</strong> Jl. Sudirman No. 123, Jakarta Pusat, 10220, Indonesia</p>
                            </div>
                        </section>

                    </div>

                    {/* Related Links */}
                    <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/privacy-policy"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {t('footer.privacy')} →
                        </Link>
                        <Link
                            to="/faq"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {t('nav.faq')} →
                        </Link>
                        <Link
                            to="/contact"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {t('footer.contact')} →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
