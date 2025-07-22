'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OwnerPage() {
  const [fruits, setFruits] = useState([]);
  const [editData, setEditData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check login status on load
  useEffect(() => {
    const loginStatus = localStorage.getItem('isOwnerLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch fruits after login
  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://127.0.0.1:8000/api/fruits/')
        .then(res => res.json())
        .then(data => {
          setFruits(data);
          const initialEdit = {};
          data.forEach(fruit => {
            initialEdit[fruit.id] = {
              name: fruit.name,
              price: fruit.price,
              quantity: fruit.quantity
            };
          });
          setEditData(initialEdit);
        });
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = 'admin123';

    if (password === correctPassword) {
      localStorage.setItem('isOwnerLoggedIn', 'true');
      setIsLoggedIn(true);
      setPassword('');
      setError('');
    } else {
      setError('❌ Incorrect password. Try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isOwnerLoggedIn');
    setIsLoggedIn(false);
    setFruits([]);
  };

  const handleChange = (id, field, value) => {
    setEditData({
      ...editData,
      [id]: {
        ...editData[id],
        [field]: field === 'price' || field === 'quantity' ? Number(value) : value,
      }
    });
  };

  const handleUpdate = async (id) => {
    const update = editData[id];
    const res = await fetch(`http://127.0.0.1:8000/api/fruits/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });

    if (res.ok) {
      const updated = await res.json();
      setFruits(fruits.map(fruit => fruit.id === id ? updated : fruit));
      alert('✅ Fruit updated!');
    } else {
      alert('❌ Failed to update');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to remove this fruit?');
    if (!confirm) return;

    const res = await fetch(`http://127.0.0.1:8000/api/fruits/${id}/`, {
      method: 'DELETE',
    });

    if (res.ok || res.status === 204) {
      setFruits(fruits.filter(fruit => fruit.id !== id));
      alert('🗑️ Fruit removed!');
    } else {
      alert('❌ Failed to remove');
    }
  };

  // Show login form if not logged in
  if (!isLoggedIn) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">🔐 Owner Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter owner password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full mb-2"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <Link
          href="/"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          🔙 Back to Homepage
        </Link>
      </div>
    );
  }

  // Owner dashboard after login
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🍇 Owner Control Panel</h1>
      <button
        onClick={handleLogout}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        🚪 Logout
      </button>

      {fruits.map((fruit) => (
        <div key={fruit.id} className="flex items-center gap-6 mb-6 p-4 border rounded shadow">
          <img
            src={`/images/${fruit.name.toLowerCase()}.png`}
            alt={fruit.name}
            className="w-40 h-40 object-contain border rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.png';
            }}
          />

          <div className="flex-1">
            <label className="block text-sm">Fruit Name:</label>
            <input
              type="text"
              value={editData[fruit.id]?.name || ''}
              onChange={(e) => handleChange(fruit.id, 'name', e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <label className="block text-sm">Price (₹):</label>
            <input
              type="number"
              value={editData[fruit.id]?.price || ''}
              onChange={(e) => handleChange(fruit.id, 'price', e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <label className="block text-sm">Quantity:</label>
            <input
              type="number"
              value={editData[fruit.id]?.quantity || ''}
              onChange={(e) => handleChange(fruit.id, 'quantity', e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <div className="flex gap-4">
              <button
                onClick={() => handleUpdate(fruit.id)}
                className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
              >
                💾 Save
              </button>
              <button
                onClick={() => handleDelete(fruit.id)}
                className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600"
              >
                ❌ Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <Link
        href="/"
        className="mt-4 inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        🔙 Back to Homepage
      </Link>
    </div>
  );
}
