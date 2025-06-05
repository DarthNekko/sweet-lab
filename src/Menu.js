import './Menu.css';
import { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './firebase';
import glovoIcon from './assets/glovo.png';
import woltIcon from './assets/wolt.png';
import boltIcon from './assets/bolt.png';

const db = getFirestore(app);

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const sidebarRef = useRef(null);

  const categoryOrder = ['Bubble Waffles', 'Crepes', 'Pancakes'];

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'menu'));
      const items = snapshot.docs.map(doc => doc.data());
      setMenuItems(items);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains('burger-menu')
      ) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSidebarVisible(false);
  };

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const groupedItems = categoryOrder.reduce((acc, category) => {
    acc[category] = filteredItems.filter(item => item.category === category);
    return acc;
  }, {});

  return (
    <section id="menu" className={`menu-container`}>
      <div className="sidebar-background" />

      <div
        className={`burger-menu ${sidebarVisible ? 'inside' : 'outside'}`}
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        ☰
      </div>

      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarVisible ? 'visible' : 'collapsed'}`}
      >
        <h2 className="menu-heading">Menu</h2>
        <button onClick={() => handleCategoryClick('All')}>All Products</button>
        {categoryOrder.map(category => (
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </aside>

      <div className="menu-content">
        {activeCategory === 'All'
          ? categoryOrder.map(category => (
              <div className="category-block" key={category}>
                <h3>{category}</h3>
                {groupedItems[category].map((item, idx) => (
                  <div className="menu-item" key={idx}>
                    <span>{item.name}</span>
                    <span>
                      {item.price} GEL
                      {item.glovo && (
                        <a href={item.glovo} target="_blank" rel="noopener noreferrer">
                          <img src={glovoIcon} alt="Glovo" className="platform-icon clickable" />
                        </a>
                      )}
                      {item.wolt && (
                        <a href={item.wolt} target="_blank" rel="noopener noreferrer">
                          <img src={woltIcon} alt="Wolt" className="platform-icon clickable" />
                        </a>
                      )}
                      {item.bolt && (
                        <a href={item.bolt} target="_blank" rel="noopener noreferrer">
                          <img src={boltIcon} alt="Bolt" className="platform-icon clickable" />
                        </a>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ))
          : (
            <div className="category-block">
              <h3>{activeCategory}</h3>
              {groupedItems[activeCategory].map((item, idx) => (
                <div className="menu-item" key={idx}>
                  <span>{item.name}</span>
                  <span>
                    {item.price} GEL
                    {item.glovo && (
                      <a href={item.glovo} target="_blank" rel="noopener noreferrer">
                        <img src={glovoIcon} alt="Glovo" className="platform-icon clickable" />
                      </a>
                    )}
                    {item.wolt && (
                      <a href={item.wolt} target="_blank" rel="noopener noreferrer">
                        <img src={woltIcon} alt="Wolt" className="platform-icon clickable" />
                      </a>
                    )}
                    {item.bolt && (
                      <a href={item.bolt} target="_blank" rel="noopener noreferrer">
                        <img src={boltIcon} alt="Bolt" className="platform-icon clickable" />
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}

export default Menu;
