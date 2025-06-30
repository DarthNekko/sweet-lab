// ContactModal.js
import './ContactModal.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function ContactModal() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact-modal">
      <h3>{t('contactUs')}</h3>
      <p>
        {t('email')}: <a href="mailto:sweetlab.geo@gmail.com">sweetlab.geo@gmail.com</a>
      </p>
      <p>
        {t('phoneNumber')}: <a href="tel:+995599997678">+995 599 99 76 78</a>
      </p>
      <p>
        {t('address')}:{' '}
        <a
          href="https://www.google.com/maps/place/11+Irakli+Abashidze+Street,+Tbilisi+0108,+Georgia"
          target="_blank"
          rel="noopener noreferrer"
        >
          11 Irakli Abashidze Street, Tbilisi 0108, Georgia
        </a>
      </p>
      <div className="social-icons">
        <a href="https://www.facebook.com/profile.php?id=61569292755168" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/sweet__laboratory/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.tiktok.com/@sweet_laboratory?_t=ZS-8wccziz0t6o&_r=1" target="_blank" rel="noopener noreferrer">
          <FaTiktok />
        </a>
      </div>
    </section>
  );
}

export default ContactModal;
