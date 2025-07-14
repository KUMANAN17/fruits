"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OwnerPage() {
  const [fruits, setFruits] = useState([]);
  const [newFruit, setNewFruit] = useState({ name: "", price: "", quantity: 0 });
  const [editQuantities, setEditQuantities] = useState({}); // Track updated quantities

  useEffect(() => {
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
  }, []);

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

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Add New Fruit</h2>
      <form onSubmit={handleAddFruit} className="space-y-3">
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
          Add Fruit
        </button>
      </form>

      <h2 className="text-lg font-semibold mt-6">All Fruits</h2>
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
      <Link href="/" className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-800">
        🔙 Homepage
      </Link>
    </div>
  );
}
