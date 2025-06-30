import './Hero.css';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home">
      <h2>{t('brand')}</h2>
      <p>{t('tagline')}</p>
      <div>
        <a href="https://glovoapp.com/ge/en/tbilisi/sweet-lab-tbi/" target="_blank" rel="noopener noreferrer">
          <button>{t('orderGlovo')}</button>
        </a>
        <a href="https://wolt.com/en/geo/tbilisi/restaurant/sweet-labb?srsltid=AfmBOoq28YLZ4e72HI9dmc_LOIpOKK-Rl_w51hrVV4aS9bo0fbyu_L-q" target="_blank" rel="noopener noreferrer">
          <button>{t('orderWolt')}</button>
        </a>
        <a href="https://food.bolt.eu/en-US/15-tbilisi/p/125688-sweet-lab" target="_blank" rel="noopener noreferrer">
          <button>{t('orderBolt')}</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
