import './AdminPanel.css';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { db, storage } from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: { en: '', ka: '' },
    price: '',
    category: 'Bubble Waffles',
    image: null
  });
  const [editId, setEditId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const categoryOptions = ['Bubble Waffles', 'Crepes', 'Pancakes'];
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
      } else {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAuthorized(true);
          fetchItems();
        } else {
          setIsAuthorized(false);
          navigate('/unauthorized');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'menu'));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenuItems(items);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        setForm({ ...form, image: file });
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else if (name === 'name_en' || name === 'name_ka') {
      const lang = name.split('_')[1];
      setForm({ ...form, name: { ...form.name, [lang]: value } });
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
    setErrorMessage('');
    setSuccessMessage('');
    const { name, price, category, image } = form;

    if (!name.en || !name.ka || !price || !category) {
      setErrorMessage('❌ All fields are required');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      setUploading(true);
      let imageUrl = null;

      if (image) {
        if (typeof image === 'string') {
          imageUrl = image;
        } else {
          imageUrl = await uploadImage(image);
        }
      }

      const itemData = {
        name,
        price: parseFloat(price),
        category,
        imageUrl
      };

      if (editId) {
        await updateDoc(doc(db, 'menu', editId), itemData);
        setSuccessMessage('✅ Item updated successfully');
      } else {
        await addDoc(collection(db, 'menu'), itemData);
        setSuccessMessage('✅ Item added successfully');
      }

      setForm({
        name: { en: '', ka: '' },
        price: '',
        category: 'Bubble Waffles',
        image: null
      });
      setPreviewUrl('');
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error('Error saving item:', err);
      setErrorMessage('❌ Failed to save item');
    } finally {
      setUploading(false);
      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'menu', id));
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || { en: '', ka: '' },
      price: item.price,
      category: item.category,
      image: item.imageUrl || null,
    });
    setPreviewUrl(item.imageUrl || '');
    setEditId(item.id);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel – Sweet Lab</h2>
      <button onClick={handleLogout} className="logout-button">🚪 Log out</button>

      {uploading && <p>Uploading image...</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name_en" value={form.name.en} onChange={handleChange} placeholder="Item name (EN)" />
        <input name="name_ka" value={form.name.ka} onChange={handleChange} placeholder="Item name (KA)" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price (₾)" />
        <select name="category" value={form.category} onChange={handleChange}>
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" height="80" />}
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name?.en}
                height="50"
                style={{ marginRight: 10 }}
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
            <strong>{item.name?.en || 'Unnamed'}</strong> – {item.price}₾ ({item.category})
            <button onClick={() => handleEdit(item)}>✏️ Edit</button>
            <button onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
