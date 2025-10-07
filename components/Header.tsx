import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocalization } from '../hooks/useLocalization';

const Header: React.FC = () => {
  const { t } = useLocalization();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-white bg-primary-600'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;
  
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
    isActive
      ? 'text-white bg-primary-600'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
  }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
            </NavLink>
            <nav className="hidden md:block md:ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/features" className={navLinkClasses}>{t('header.features')}</NavLink>
                <NavLink to="/pricing" className={navLinkClasses}>{t('header.pricing')}</NavLink>
                <NavLink to="/faq" className={navLinkClasses}>{t('header.faq')}</NavLink>
              </div>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/generator" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {t('header.generate_video')}
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/features" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{t('header.features')}</NavLink>
            <NavLink to="/pricing" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{t('header.pricing')}</NavLink>
            <NavLink to="/faq" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>{t('header.faq')}</NavLink>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-2">
                <LanguageSwitcher />
              </div>
               <div className="mt-3 px-2 space-y-1">
                  <Link to="/generator" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700">{t('header.generate_video')}</Link>
               </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;