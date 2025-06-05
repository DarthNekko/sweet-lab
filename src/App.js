import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Menu from './Menu';
import ContactModal from './ContactModal';
import AdminPanel from './AdminPanel';
import Login from './Login'; // ✅ Import your login page
import './Footer.css';
import './global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Menu />
              <ContactModal />
              <footer className="site-footer">
                <span>© 2025 Sweet Lab. All rights reserved.</span>
              </footer>
            </>
          }
        />
        <Route path="/login" element={<Login />} /> {/* ✅ Add this */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
