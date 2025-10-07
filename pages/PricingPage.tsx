
import React from 'react';
import Section from '../components/Section';
import { useLocalization } from '../hooks/useLocalization';
import type { Plan } from '../types';

const PricingPage: React.FC = () => {
    const { t } = useLocalization();

    const plans: Plan[] = [
        { name: 'free', price: '0', priceSuffixKey: 'per_month', credits: t('pricing_page.plans.free.credits'), features: ['feature_1', 'feature_2', 'feature_3'] },
        { name: 'pro', price: '4999', priceSuffixKey: 'per_month', credits: t('pricing_page.plans.pro.credits'), features: ['feature_1', 'feature_2', 'feature_3', 'feature_4'], popular: true },
        { name: 'enterprise', price: t('pricing_page.plans.enterprise.price'), priceSuffixKey: 'contact_us', credits: t('pricing_page.plans.enterprise.credits'), features: ['feature_1', 'feature_2', 'feature_3', 'feature_4', 'feature_5'] },
    ];
    
    const CheckIcon = () => (
        <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    );

    return (
        <div className="animate-fade-in-up">
            <Section className="bg-white dark:bg-gray-950">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {t('pricing_page.title')}
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400">
                        {t('pricing_page.subtitle')}
                    </p>
                </div>
            </Section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`relative p-8 border rounded-2xl flex flex-col ${plan.popular ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'}`}>
                           {plan.popular && (
                               <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm text-white bg-primary-600 rounded-full shadow-md">
                                  {t('pricing_page.popular')}
                               </div>
                           )}
                           <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t(`pricing_page.plans.${plan.name}.title`)}</h3>
                           <p className="mt-2 text-gray-500 dark:text-gray-400">{t(`pricing_page.plans.${plan.name}.description`)}</p>
                           <div className="mt-6">
                                <span className="text-4xl font-bold">{plan.name !== 'enterprise' && 'DA '}{plan.price}</span>
                                {plan.priceSuffixKey !== 'contact_us' && <span className="text-gray-500"> / {t(`pricing_page.${plan.priceSuffixKey}`)}</span>}
                           </div>
                           <p className="mt-4 font-semibold">{plan.credits}</p>
                           <ul className="mt-6 space-y-4 flex-grow">
                            {plan.features.map(featureKey => (
                                <li key={featureKey} className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <CheckIcon />
                                    </div>
                                    <p className="ml-3 rtl:mr-3 text-gray-700 dark:text-gray-300">{t(`pricing_page.features.${featureKey}`)}</p>
                                </li>
                            ))}
                           </ul>
                           <a href="#" className={`mt-8 block w-full py-3 px-6 text-center rounded-md font-medium ${plan.popular ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}>
                                {t('pricing_page.cta')}
                           </a>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default PricingPage;
