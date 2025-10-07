
import React, { useState } from 'react';
import Section from '../components/Section';
import { useLocalization } from '../hooks/useLocalization';
import type { FAQItem } from '../types';

const AccordionItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-900 dark:text-white"
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-500 dark:text-gray-400">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  const { t } = useLocalization();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    // Fix: The 'answer' key must be the same as the 'question' key to match the FAQItem type.
    { question: 'q1', answer: 'q1' },
    // Fix: The 'answer' key must be the same as the 'question' key to match the FAQItem type.
    { question: 'q2', answer: 'q2' },
    // Fix: The 'answer' key must be the same as the 'question' key to match the FAQItem type.
    { question: 'q3', answer: 'q3' },
    // Fix: The 'answer' key must be the same as the 'question' key to match the FAQItem type.
    { question: 'q4', answer: 'q4' },
    // Fix: The 'answer' key must be the same as the 'question' key to match the FAQItem type.
    { question: 'q5', answer: 'q5' },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="animate-fade-in-up">
      <Section className="bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t('faq_page.title')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400">
            {t('faq_page.subtitle')}
          </p>
        </div>
      </Section>
      <Section>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={t(`faq_page.questions.${item.question}.q`)}
              answer={t(`faq_page.questions.${item.answer}.a`)}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default FAQPage;