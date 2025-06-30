import { useTranslation } from 'react-i18next';
import './Header.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="language-switcher">
      <button className={currentLang === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')}>
        🇬🇧 EN
      </button>
      <button className={currentLang === 'ka' ? 'active' : ''} onClick={() => i18n.changeLanguage('ka')}>
        🇬🇪 KA
      </button>
    </div>
  );
}

export default LanguageSwitcher;