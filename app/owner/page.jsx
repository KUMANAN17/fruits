'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OwnerPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [fruits, setFruits] = useState([]);
  const [editQuantities, setEditQuantities] = useState({});
  const [newFruit, setNewFruit] = useState({ name: '', price: '', quantity: 0 });

  const OWNER_PASSWORD = 'admin123';

  useEffect(() => {
    if (loggedIn) {
      fetch("http://127.0.0.1:8000/api/fruits/")
        .then((res) => res.json())
        .then((data) => {
          setFruits(data);
          const quantities = {};
          data.forEach(fruit => {
            quantities[fruit.id] = fruit.quantity;
          });
          setEditQuantities(quantities);
        });
    }
  }, [loggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === OWNER_PASSWORD) {
      setLoggedIn(true);
    } else {
      alert("Wrong password");
    }
  };

  const handleAddFruit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/fruits/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFruit),
    });

    const data = await res.json();
    setFruits([...fruits, data]);
    setEditQuantities({ ...editQuantities, [data.id]: data.quantity });
    setNewFruit({ name: "", price: "", quantity: 0 });
  };

  const handleQuantityChange = (id, newQuantity) => {
    setEditQuantities({ ...editQuantities, [id]: newQuantity });
  };

  const handleUpdateQuantity = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/fruits/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: editQuantities[id] }),
    });

    if (res.ok) {
      const updated = await res.json();
      setFruits(fruits.map(f => (f.id === id ? updated : f)));
    }
  };

  if (!loggedIn) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Owner Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter owner password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">🍎🍊🍇 Owner Panel🍇🍊🍎</h2>

      <form onSubmit={handleAddFruit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Fruit name"
          value={newFruit.name}
          onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newFruit.price}
          onChange={(e) => setNewFruit({ ...newFruit, price: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newFruit.quantity}
          onChange={(e) => setNewFruit({ ...newFruit, quantity: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Fruit
        </button>
      </form>

      <h2 className="text-lg font-semibold">Edit Fruit Quantities</h2>
      <ul className="mt-2 space-y-3">
        {fruits.map((fruit) => (
          <li key={fruit.id} className="flex items-center space-x-4">
            <span>
              {fruit.name} - ₹{fruit.price}
            </span>
            <input
              type="number"
              value={editQuantities[fruit.id] || 0}
              onChange={(e) => handleQuantityChange(fruit.id, e.target.value)}
              className="border p-1 w-20 rounded"
            />
            <button
              onClick={() => handleUpdateQuantity(fruit.id)}
              className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            >
               Save
            </button>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-4 inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
        🔙 Back to Homepage
      </Link>
    </div>
  );
}
