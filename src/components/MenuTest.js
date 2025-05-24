import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function MenuTest() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const querySnapshot = await getDocs(collection(db, 'menu'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(data);
    };

    fetchMenu();
  }, []);

  return (
    <div>
      <h2>Menu Items from Firestore</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} — {item.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default MenuTest;
