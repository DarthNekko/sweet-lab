// ContactModal.js
import './ContactModal.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

function ContactModal() {
  return (
    <section id="contact" className="contact-modal">
      <h3>Contact Us</h3>
      <p>Email: <a href="mailto:contact@sweetlab.com">contact@sweetlab.com</a></p>
      <p>
        Address:{' '}
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
