
import React from 'react';
import Logo from './Logo';
import { useLocalization } from '../hooks/useLocalization';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const { t } = useLocalization();

    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Logo className="h-8 w-auto"/>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {t('footer.tagline')}
                        </p>
                        <div className="flex space-x-4">
                          {/* Social Icons */}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">{t('footer.links.title')}</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/features" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">{t('footer.links.features')}</Link></li>
                            <li><Link to="/pricing" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">{t('footer.links.pricing')}</Link></li>
                             <li><Link to="/faq" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">{t('footer.links.faq')}</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">{t('footer.legal.title')}</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">{t('footer.legal.privacy')}</a></li>
                            <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">{t('footer.legal.terms')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">{t('footer.contact.title')}</h3>
                        <ul className="mt-4 space-y-2">
                            <li className="text-base text-gray-500 dark:text-gray-400">contact@creativeai.dz</li>
                             <li className="text-base text-gray-500 dark:text-gray-400">Algiers, Algeria</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} CreativeAI. {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
