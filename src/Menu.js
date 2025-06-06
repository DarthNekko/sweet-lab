import './Menu.css';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './firebase';
import glovoIcon from './assets/glovo.png';
import woltIcon from './assets/wolt.png';
import boltIcon from './assets/bolt.png';

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

  const renderItemBlock = (item) => (
    <div className="pink-item" key={item.name}>
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} className="menu-item-img" />
      )}
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
        {categoryOrder.map(category => (
          groupedItems[category]?.length > 0 && (
            <div className="category-block" key={category}>
              <h3>{category}</h3>
              {groupedItems[category].map(item => renderItemBlock(item))}
            </div>
          )
        ))}
      </div>
    </section>
  );
}

export default Menu;
