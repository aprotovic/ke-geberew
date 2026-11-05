import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const currentLang = (i18n.language || 'en').startsWith('am') ? 'am' : 'en';

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
      localStorage.setItem('language', lng);
    } catch (e) {
      // storage unavailable
    }
  };

  return (
    <div className="language-selector" role="group" aria-label="Language selection">
      <button
        type="button"
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        title="Switch to English"
      >
        English
      </button>
      <button
        type="button"
        className={`lang-btn ${currentLang === 'am' ? 'active' : ''}`}
        onClick={() => changeLanguage('am')}
        title="ወደ አማርኛ ቀይር"
      >
        አማርኛ
      </button>
    </div>
  );
};

export default LanguageSelector;
