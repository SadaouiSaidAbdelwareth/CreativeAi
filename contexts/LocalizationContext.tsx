
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Language, TranslationKeys } from '../types';
import { translations } from '../constants/translations';

type TranslationFunction = (key: string) => string;

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationFunction;
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const root = window.document.documentElement;
    if (language === 'ar') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }
  }, [language]);

  const t: TranslationFunction = useCallback((key: string) => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            // Fallback to English if translation not found
            let fallbackResult: any = translations.en;
            for(const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
            }
            return fallbackResult || key;
        }
    }
    return result || key;
  }, [language]);

  const contextValue = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
};
