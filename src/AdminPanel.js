import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD06lICMUULN4ByLgQIZEXv89fXC4FHuv8",
  authDomain: "sweet-lab-2fda2.firebaseapp.com",
  projectId: "sweet-lab-2fda2",
  storageBucket: "sweet-lab-2fda2.firebaseapp.com",
  messagingSenderId: "523115946393",
  appId: "1:523115946393:web:63078fabcb14161192f308",
  measurementId: "G-JM6ECM7D8L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, storage } from './firebase';
import './AdminPanel.css';

const db = getFirestore(app);

function AdminPanel() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: 'Bubble Waffles', image: null });
  const [editId, setEditId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const categoryOptions = ['Bubble Waffles', 'Crepes', 'Pancakes'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'menu'));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenuItems(items);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const uploadImage = async (file) => {
    const imageRef = ref(storage, `menu-images/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, category, image } = form;
    if (!name || !price || !category) return alert('All fields are required');

    let imageUrl = '';
    if (image && typeof image !== 'string') {
      imageUrl = await uploadImage(image);
    } else if (typeof image === 'string') {
      imageUrl = image;
    }

    const itemData = { name, price: parseFloat(price), category, image: imageUrl };

    if (editId) {
      await updateDoc(doc(db, 'menu', editId), itemData);
    } else {
      await addDoc(collection(db, 'menu'), itemData);
    }

    setForm({ name: '', price: '', category: 'Bubble Waffles', image: null });
    setPreviewUrl('');
    setEditId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'menu', id));
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image || null,
    });
    setPreviewUrl(item.image || '');
    setEditId(item.id);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel – Sweet Lab</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Item name" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price (₾)" />
        <select name="category" value={form.category} onChange={handleChange}>
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" height="80" />}
        <button type="submit">{editId ? 'Update Item' : 'Add Item'}</button>
      </form>

      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} height="50" style={{ marginRight: 10 }} />
            <strong>{item.name}</strong> – {item.price}₾ ({item.category})
            <button onClick={() => handleEdit(item)}>✏️ Edit</button>
            <button onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
