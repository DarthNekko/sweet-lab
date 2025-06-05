import './Menu.css';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './firebase';
import glovoIcon from './assets/glovo.png';
import woltIcon from './assets/wolt.png';
import boltIcon from './assets/bolt.png';
import bubbleWaffleImg from './assets/bubble-waffle.png';
import crepesImg from './assets/crepes.png';
import pancakesImg from './assets/pancakes.png';

const db = getFirestore(app);

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  const categoryOrder = ['Bubble Waffles', 'Crepes', 'Pancakes'];

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'menu'));
      const items = snapshot.docs.map(doc => doc.data());
      setMenuItems(items);
    };

    fetchData();
  }, []);

  const groupedItems = categoryOrder.reduce((acc, category) => {
    acc[category] = menuItems.filter(item => item.category === category);
    return acc;
  }, {});

  const renderItemBlock = (item, imgSrc) => (
    <div className="pink-item" key={item.name}>
      <img src={imgSrc} alt={item.name} className="menu-item-img" />
      <span className="menu-item-name">{item.name}</span>
      <span className="menu-item-price">{item.price} GEL</span>
      <span className="menu-item-icons">
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
  );

  return (
    <section id="menu" className="menu-container">
      <div className="menu-content">
        {/* Bubble Waffles */}
        {groupedItems['Bubble Waffles']?.length > 0 && (
          <div className="category-block">
            <h3>Bubble Waffles</h3>
            {groupedItems['Bubble Waffles'].map(item => renderItemBlock(item, bubbleWaffleImg))}
          </div>
        )}

        {/* Crepes */}
        {groupedItems['Crepes']?.length > 0 && (
          <div className="category-block">
            <h3>Crepes</h3>
            {groupedItems['Crepes'].map(item => renderItemBlock(item, crepesImg))}
          </div>
        )}

        {/* Pancakes */}
        {groupedItems['Pancakes']?.length > 0 && (
          <div className="category-block">
            <h3>Pancakes</h3>
            {groupedItems['Pancakes'].map(item => renderItemBlock(item, pancakesImg))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
