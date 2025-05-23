import './Header.css';

function Header() {
  return (
    <header>
      <div className="logo-container">
        <img src="/sweetlab-logo.png" alt="Sweet Lab Logo" />
        <span className="brand-name">Sweet Lab</span>
      </div>
      <nav>
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
