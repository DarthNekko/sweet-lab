import './Header.css';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'ka' : 'en');
  };

  return (
    <header>
      <div className="header-top">
        <button className="language-toggle" onClick={changeLanguage}>
          {currentLang === 'en' ? '🇬🇧 EN' : '🇬🇪 KA'}
        </button>
      </div>

      <div className="logo-container">
        <img src="/sweetlab-logo.png" alt="Sweet Lab Logo" />
        <span className="brand-name">{t('brand')}</span>
      </div>

      <nav>
        <a href="#home">{t('home')}</a>
        <a href="#menu">{t('menu')}</a>
        <a href="#contact">{t('contact')}</a>
      </nav>
    </header>
  );
}

export default Header;
