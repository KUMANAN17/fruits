'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OwnerPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [fruits, setFruits] = useState([]);
  const [newFruit, setNewFruit] = useState({
    name: '',
    price: '',
    quantity: '',
   
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // ✅ Check localStorage login status on first load
  useEffect(() => {
    const stored = localStorage.getItem('ownerLoggedIn');
    if (stored === 'true') {
      setLoggedIn(true);
      fetchFruits();
    }
  }, []);

  // ✅ Dummy login logic
  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('ownerLoggedIn', 'true');
      setLoggedIn(true);
      fetchFruits();
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('ownerLoggedIn');
      setLoggedIn(false);
      setFruits([]);
      setPassword('');
    }
  };

  const fetchFruits = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/fruits/');
      const data = await res.json();
      setFruits(data);
    } catch (error) {
      alert('Error fetching fruits');
    }
  };

  const handleInputChange = (id, field, value) => {
    const updated = fruits.map((fruit) =>
      fruit.id === id ? { ...fruit, [field]: value } : fruit
    );
    setFruits(updated);
  };

  const handleSave = async (fruit) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/fruits/${fruit.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fruit),
      });
      if (res.ok) {
        fetchFruits();
      } else {
        alert('Failed to update');
      }
    } catch {
      alert('Error saving');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/fruits/${id}/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchFruits();
      } else {
        alert('Failed to delete');
      }
    } catch {
      alert('Error deleting');
    }
  };

  const handleAddFruit = async () => {
    if (!newFruit.name || !newFruit.price || !newFruit.quantity) {
      alert('Fill all fields');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/fruits/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFruit),
      });

      if (res.ok) {
        setNewFruit({ name: '', price: '', quantity: '' });
        fetchFruits();
        setShowAddForm(false);
      } else {
        alert('Failed to add fruit');
      }
    } catch {
      alert('Error adding fruit');
    }
  };

  
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
         
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">🔐 Owner Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ✅ Owner control panel after login
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🍇 Owner Control Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          🔒 Logout
        </button>
      </div>

      
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        {showAddForm ? '⬅️ Hide Add Form' : '➕ Add Fruits'}
      </button>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white p-4 rounded shadow-md mb-6 w-full max-w-xl">
          <h2 className="font-bold mb-4">Add Fruit</h2>
          <input
            type="text"
            placeholder="Fruit Name"
            value={newFruit.name}
            onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={newFruit.price}
            onChange={(e) => setNewFruit({ ...newFruit, price: parseFloat(e.target.value) })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newFruit.quantity}
            onChange={(e) => setNewFruit({ ...newFruit, quantity: parseInt(e.target.value) })}
            className="border p-2 mb-2 w-full"
          />
          
          
          <button
            onClick={handleAddFruit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Add Fruit
          </button>
        </div>
      )}

      {/* Fruit List */}
      <h2 className="text-xl font-semibold mb-4">🍑 Fruits List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fruits.map((fruit) => (
          <div key={fruit.id} className="bg-white p-4 rounded shadow-md">
            <img
              src={`/images/${fruit.name.toLowerCase()}.png`}
              alt={fruit.name}
              className="w-full h-28 object-contain mb-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.png';
              }}
            />

            <input
              type="text"
              value={fruit.name}
              onChange={(e) => handleInputChange(fruit.id, 'name', e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              value={fruit.price}
              onChange={(e) => handleInputChange(fruit.id, 'price', parseFloat(e.target.value))}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              value={fruit.quantity}
              onChange={(e) => handleInputChange(fruit.id, 'quantity', parseInt(e.target.value))}
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleSave(fruit)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                💾 Save
              </button>
              <button
                onClick={() => handleDelete(fruit.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                ❌ Remove
              </button>
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
    </div>
  );
}
