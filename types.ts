
export type Language = 'en' | 'ar' | 'fr';

export type Theme = 'light' | 'dark';

export interface Plan {
  name: keyof TranslationKeys['pricing_page']['plans'];
  price: string;
  priceSuffixKey: keyof TranslationKeys['pricing_page'];
  credits: string;
  features: (keyof TranslationKeys['pricing_page']['features'])[];
  popular?: boolean;
}

export interface Feature {
  icon: React.ReactNode;
  title: keyof TranslationKeys['features_page']['feature_list'];
  description: keyof TranslationKeys['features_page']['feature_list'];
}

export interface FAQItem {
  question: keyof TranslationKeys['faq_page']['questions'];
  answer: keyof TranslationKeys['faq_page']['questions'];
}

// A helper type for nested translation keys
export type TranslationKeys = typeof import('./constants/translations').translations.en;
