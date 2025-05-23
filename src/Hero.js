import './Hero.css';

function Hero() {
  return (
    <section id="home">
      <h2>Sweet Lab</h2>
      <p>Desserts that make you feel things.</p>
      <div>
        <a href="https://glovoapp.com/ge/en/tbilisi/sweet-lab-tbi/" target="_blank" rel="noopener noreferrer">
          <button>Order on Glovo</button>
        </a>
        <a href="https://wolt.com/en/geo/tbilisi/restaurant/sweet-labb?srsltid=AfmBOoq28YLZ4e72HI9dmc_LOIpOKK-Rl_w51hrVV4aS9bo0fbyu_L-q" target="_blank" rel="noopener noreferrer">
          <button>Order on Wolt</button>
        </a>
        <a href="https://food.bolt.eu/en-US/15-tbilisi/p/125688-sweet-lab" target="_blank" rel="noopener noreferrer">
          <button>Order on Bolt</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
