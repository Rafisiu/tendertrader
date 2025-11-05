import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/data/translations/en.json';
import id from '@/data/translations/id.json';

// Define the type for our translations
type TranslationKeys = keyof typeof en;

const translations = {
  en,
  id
};

export const useTranslation = () => {
  const { language } = useLanguage();
  const [translationData, setTranslationData] = useState(translations.en);

  useEffect(() => {
    setTranslationData(translations[language as keyof typeof translations] || translations.en);
  }, [language]);

  const t = (key: string): string => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: any = translationData;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key; // Return the key itself if translation is not found
  };

  return { t };
};