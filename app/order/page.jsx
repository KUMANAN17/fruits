'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrderPage() {
  const [fruits, setFruits] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/fruits/')
      .then(res => res.json())
      .then(data => {
        setFruits(data);
        const initialQty = {};
        data.forEach(fruit => {
          initialQty[fruit.id] = 1;
        });
        setQuantities(initialQty);
      });
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: Number(value) });
  };

  const handleOrder = (fruit) => {
    const qty = quantities[fruit.id] || 1;
    alert(`✅ You ordered ${qty} ${fruit.name}(s) for ₹${fruit.price * qty}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Order Fruits</h1>

      {fruits.map(fruit => (
        <div key={fruit.id} className="flex items-center gap-6 mb-6 p-4 border rounded shadow">
          <img
            src={`/images/${fruit.name.toLowerCase()}.png`}
            alt={fruit.name}
            className="w-32 h-32 object-contain border rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.png';
            }}
          />

          <div className="flex-1">
            <h2 className="text-lg font-semibold">{fruit.name}</h2>
            <p>Price: ₹{fruit.price}</p>
            <label className="block mt-2">Quantity:</label>
            <input
              type="number"
              value={quantities[fruit.id] || 1}
              onChange={(e) => handleQuantityChange(fruit.id, e.target.value)}
              min="1"
              className="border p-2 w-24"
            />
            <button
              onClick={() => handleOrder(fruit)}
              className="ml-4 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              🛍️ Order
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
  );
}
