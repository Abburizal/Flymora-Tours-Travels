import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('footer.privacy')}</h1>
                    <p className="text-xl text-blue-100">
                        {t('privacy.yourPrivacyImportant')}
                    </p>
                    <p className="text-sm text-blue-200 mt-4">
                        {t('privacy.lastUpdated')}: January 25, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
                    <div className="prose prose-blue max-w-none">
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. {t('privacy.introduction')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.introductionText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. {t('privacy.informationWeCollect')}</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 {t('privacy.personalInformation')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.personalInformationDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('privacy.fullName')}</li>
                                <li>{t('privacy.emailAddress')}</li>
                                <li>{t('privacy.phoneNumber')}</li>
                                <li>{t('privacy.passportDetails')}</li>
                                <li>{t('privacy.emergencyContact')}</li>
                                <li>{t('privacy.paymentInfo')}</li>
                                <li>{t('privacy.dateOfBirth')}</li>
                                <li>{t('privacy.dietaryRequirements')}</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 {t('privacy.automaticallyCollected')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.automaticallyCollectedDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('privacy.ipAddress')}</li>
                                <li>{t('privacy.browserType')}</li>
                                <li>{t('privacy.deviceInfo')}</li>
                                <li>{t('privacy.pagesVisited')}</li>
                                <li>{t('privacy.referringWebsite')}</li>
                                <li>{t('privacy.cookiesTracking')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. {t('privacy.howWeUseInfo')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.howWeUseInfoDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li><strong>{t('privacy.processBookings')}:</strong> {t('privacy.processBookingsDesc')}</li>
                                <li><strong>{t('privacy.paymentProcessing')}:</strong> {t('privacy.paymentProcessingDesc')}</li>
                                <li><strong>{t('privacy.communication')}:</strong> {t('privacy.communicationDesc')}</li>
                                <li><strong>{t('privacy.customerSupport')}:</strong> {t('privacy.customerSupportDesc')}</li>
                                <li><strong>{t('privacy.marketing')}:</strong> {t('privacy.marketingDesc')}</li>
                                <li><strong>{t('privacy.improveServices')}:</strong> {t('privacy.improveServicesDesc')}</li>
                                <li><strong>{t('privacy.legalCompliance')}:</strong> {t('privacy.legalComplianceDesc')}</li>
                                <li><strong>{t('privacy.safety')}:</strong> {t('privacy.safetyDesc')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. {t('privacy.informationSharing')}</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 {t('privacy.serviceProviders')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.serviceProvidersDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('privacy.hotels')}</li>
                                <li>{t('privacy.transportation')}</li>
                                <li>{t('privacy.activityOperators')}</li>
                                <li>{t('privacy.paymentProcessors')}</li>
                                <li>{t('privacy.emailProviders')}</li>
                                <li>{t('privacy.analyticsProviders')}</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 {t('privacy.legalRequirements')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.legalRequirementsDesc')}
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 {t('privacy.businessTransfers')}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.businessTransfersDesc')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. {t('privacy.dataSecurity')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.dataSecurityDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('privacy.sslEncryption')}</li>
                                <li>{t('privacy.secureServers')}</li>
                                <li>{t('privacy.regularAudits')}</li>
                                <li>{t('privacy.employeeTraining')}</li>
                                <li>{t('privacy.pciCompliant')}</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.noGuarantee')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. {t('privacy.cookiesTracking')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.useCookies')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('privacy.rememberPreferences')}</li>
                                <li>{t('privacy.analyzeTraffic')}</li>
                                <li>{t('privacy.providePersonalized')}</li>
                                <li>{t('privacy.enableSocial')}</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.controlCookies')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. {t('privacy.yourRights')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.yourRightsDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li><strong>{t('privacy.access')}:</strong> {t('privacy.accessDesc')}</li>
                                <li><strong>{t('privacy.correction')}:</strong> {t('privacy.correctionDesc')}</li>
                                <li><strong>{t('privacy.deletion')}:</strong> {t('privacy.deletionDesc')}</li>
                                <li><strong>{t('privacy.objection')}:</strong> {t('privacy.objectionDesc')}</li>
                                <li><strong>{t('privacy.portability')}:</strong> {t('privacy.portabilityDesc')}</li>
                                <li><strong>{t('privacy.withdrawConsent')}:</strong> {t('privacy.withdrawConsentDesc')}</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.exerciseRights')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. {t('privacy.dataRetention')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.dataRetentionDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                <li>{t('privacy.provideServices')}</li>
                                <li>{t('privacy.legalCompliance2')}</li>
                                <li>{t('privacy.resolveDisputes')}</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.typicallyRetain')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. {t('privacy.childrenPrivacy')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.childrenPrivacyText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. {t('privacy.thirdPartyLinks')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.thirdPartyLinksText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. {t('privacy.internationalTransfers')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.internationalTransfersText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. {t('privacy.changesToPolicy')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('privacy.changesToPolicyText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">13. {t('footer.contact')}</h2>
                            <p className="text-gray-600 leading-relaxed mb-2">
                                {t('privacy.contactQuestion')}
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-600"><strong>{t('contact.email')}:</strong> privacy@flymoratours.com</p>
                                <p className="text-gray-600"><strong>{t('contact.phone')}:</strong> +62 812 3456 7890</p>
                                <p className="text-gray-600"><strong>{t('contact.office')}:</strong> Jl. Sudirman No. 123, Jakarta Pusat, 10220, Indonesia</p>
                            </div>
                        </section>

                    </div>

                    {/* Related Links */}
                    <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/terms-of-service"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {t('footer.terms')} →
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
