import React from 'react';
import { useTranslation } from 'react-i18next';

import '../styles/translation.scss';

function TranslationDropdown() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng).catch((err: Error) => err);
    // todo console.log but not with lint
  };

  return (
    <div className="language-selector-container">
      <select className="language-selector select" onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => handleLanguageChange(ev)}>
        <option className="option" value="en">{t('language.en')}</option>
        <option className="option" value="fr">{t('language.fr')}</option>
      </select>
    </div>
  );
}

export default TranslationDropdown;
