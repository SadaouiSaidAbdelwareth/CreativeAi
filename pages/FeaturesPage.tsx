
import React from 'react';
import Section from '../components/Section';
import { useLocalization } from '../hooks/useLocalization';
import type { Feature } from '../types';

const iconMap = {
    ai: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    customize: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    fast: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    multilingual: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13h4m-4 0a4 4 0 11-8 0 4 4 0 018 0zm-4-9v2m0-4h.01M5 12h.01M19 12h.01M12 19v-2m0-4h.01M5 19h.01M19 19h.01" />
        </svg>
    ),
};

const FeaturesPage: React.FC = () => {
  const { t } = useLocalization();

  const features: Feature[] = [
    // Fix: The 'description' key should be the same as the 'title' key to match the Feature type.
    { icon: iconMap.ai, title: 'ai_power', description: 'ai_power' },
    // Fix: The 'description' key should be the same as the 'title' key to match the Feature type.
    { icon: iconMap.customize, title: 'easy_customization', description: 'easy_customization' },
    // Fix: The 'description' key should be the same as the 'title' key to match the Feature type.
    { icon: iconMap.fast, title: 'fast_generation', description: 'fast_generation' },
    // Fix: The 'description' key should be the same as the 'title' key to match the Feature type.
    { icon: iconMap.multilingual, title: 'multilingual_support', description: 'multilingual_support' },
  ];

  return (
    <div className="animate-fade-in-up">
      <Section className="bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t('features_page.title')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400">
            {t('features_page.subtitle')}
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-600">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t(`features_page.feature_list.${feature.title}.title`)}</h3>
                <p className="mt-1 text-base text-gray-500 dark:text-gray-400">{t(`features_page.feature_list.${feature.description}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default FeaturesPage;