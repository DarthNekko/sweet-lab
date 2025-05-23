import './Menu.css';
import { useState } from 'react';

const menuData = {
  'Bubble Waffles': [
    { name: 'Dubai Chocolate Bubble Waffle', price: '21.50' },
    { name: 'Cinnamon Bubble Waffle', price: '14.50' },
    { name: 'Vanilla Bubble Waffle', price: '14.50' },
    { name: 'Red Velvet Bubble Waffle', price: '17.50' },
    { name: 'Bubble waffle with Oreo, vanilla cream and ice cream', price: '19.50' },
  ],
  'Crepes': [
    { name: 'Dubai Chocolate Crepe', price: '24.90' },
    { name: 'Crepe with strawberries, banana and chocolate', price: '18.90' },
    { name: 'Crepe with chocolate and strawberries', price: '17.90' },
    { name: 'Crepe with Nutella', price: '14.90' },
    { name: 'Crepe with raspberry jam and fruit', price: '16.90' },
    { name: 'Crepe with Nutella and Banana', price: '16.90' },
    { name: 'Crepe with Honey and Sour Cream', price: '16.90' },
    { name: 'Crepe with sour cream and raspberry jam', price: '16.90' },
    { name: 'Crepe with caramel and almond', price: '16.90' },
    { name: 'Crepe with cream cheese and cherry jam', price: '16.90' },
    { name: 'Crepe with orange jam and vanilla cream', price: '16.90' },
    { name: 'Crepe with Nutella and hazelnuts', price: '16.90' },
    { name: 'Crepe with Nutella and coconut flakes', price: '16.90' },
  ],
  'Pancakes': [
    { name: 'Pancake Dubai Chocolate (5 pieces)', price: '24.50' },
    { name: 'Pancake with chocolate and strawberries (5 pieces)', price: '17.90' },
    { name: 'Pancake with Nutella and Banana (5 pieces)', price: '16.90' },
    { name: 'Pancake with Nutella and Oreo (5 pieces)', price: '19.90' },
    { name: 'Pancake with raspberry-cherry mix jam (5 pieces)', price: '17.90' },
    { name: 'Pancake with vanilla cream and caramel (5 pieces)', price: '16.90' },
  ]
};

function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryOrder = ['Bubble Waffles', 'Crepes', 'Pancakes'];

  const renderItems = (category) => {
    return (
      <div className="category-block" key={category}>
        <h3>{category}</h3>
        {menuData[category].map((item, idx) => (
          <div className="menu-item" key={idx}>
            <span>{item.name}</span>
            <span>{item.price} GEL</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="menu-container">
      <aside className="sidebar">
  <h2 className="menu-heading">Our Menu</h2>
  <button onClick={() => setActiveCategory('All')}>All Products</button>
  {categoryOrder.map((category) => (
    <button key={category} onClick={() => setActiveCategory(category)}>
      {category}
    </button>
  ))}
</aside>


      <div className="menu-content">
        {activeCategory === 'All'
          ? categoryOrder.map((category) => renderItems(category))
          : renderItems(activeCategory)}
      </div>
    </section>
  );
}

export default Menu;
