import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Link } from 'react-router-dom';
import Section from '../components/Section';

const HomePage: React.FC = () => {
  const { t } = useLocalization();

  const HeroSection = () => (
    <div className="text-center py-16 md:py-24 animate-fade-in-up relative z-10">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="block">{t('home_page.hero.title_1')}</span>
        <span className="block text-primary-600">{t('home_page.hero.title_2')}</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400">
        {t('home_page.hero.subtitle')}
      </p>
      <div className="mt-8 flex justify-center">
        <Link
          to="/generator"
          className="px-8 py-3 text-lg font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-transform transform hover:scale-105"
        >
          {t('home_page.hero.cta')}
        </Link>
      </div>
    </div>
  );

  const AnimatedBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 dark:bg-purple-900 rounded-2xl mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-float animation-delay-3000"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-2xl opacity-50 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-200 dark:bg-teal-900 rounded-3xl mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-60 animate-float animation-delay-2000"></div>
    </div>
  );

  const HowItWorksSection = () => (
    <Section>
        <div className="text-center">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{t('home_page.how_it_works.title')}</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-2xl font-bold">1</div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">{t('home_page.how_it_works.step1_title')}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{t('home_page.how_it_works.step1_desc')}</p>
            </div>
            {/* Step 2 */}
            <div className="p-6">
                 <div className="flex items-center justify-center h-16 w-16 mx-auto bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-2xl font-bold">2</div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">{t('home_page.how_it_works.step2_title')}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{t('home_page.how_it_works.step2_desc')}</p>
            </div>
            {/* Step 3 */}
            <div className="p-6">
                 <div className="flex items-center justify-center h-16 w-16 mx-auto bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-2xl font-bold">3</div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">{t('home_page.how_it_works.step3_title')}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{t('home_page.how_it_works.step3_desc')}</p>
            </div>
        </div>
    </Section>
  );

  const BenefitsSection = () => (
     <Section className="bg-white dark:bg-gray-950">
          <div className="text-center">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{t('home_page.benefits.title')}</h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">{t('home_page.benefits.subtitle')}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
                { title: 'benefit1_title', desc: 'benefit1_desc'},
                { title: 'benefit2_title', desc: 'benefit2_desc'},
                { title: 'benefit3_title', desc: 'benefit3_desc'},
            ].map(benefit => (
                 <div key={benefit.title} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t(`home_page.benefits.${benefit.title}`)}</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{t(`home_page.benefits.${benefit.desc}`)}</p>
                </div>
            ))}
        </div>
     </Section>
  );

  return (
    <div>
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <AnimatedBackground />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection />
        </div>
      </div>
      <HowItWorksSection />
      <BenefitsSection />
    </div>
  );
};

export default HomePage;