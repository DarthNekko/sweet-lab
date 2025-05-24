import Header from './Header';
import Hero from './Hero';
import Menu from './Menu';
import ContactModal from './ContactModal';
import './Footer.css';
import './global.css';



function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Menu />
      <ContactModal />
      <footer className="site-footer">
  <span>© 2025 Sweet Lab. All rights reserved.</span>
</footer>
    </div>
  );
}


export default App;
