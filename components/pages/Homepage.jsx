'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Homepage() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/fruits/')
      .then(res => res.json())
      .then(data => setFruits(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">🍎 Welcome to the Fruit Shop</h1>

      <div className="grid md:grid-cols-5 sm:grid-cols-3 gap-10">
        {fruits.map(fruit => (
          <div key={fruit.id} className="border p-4 rounded shadow">
            <img
              src={`/images/${fruit.name.toLowerCase()}.png`}
              alt={fruit.name}
              className="w-full h-50 object-contain mb-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.png';
              }}
            />
            <h2 className="text-xl font-semibold">{fruit.name}</h2>
            <p className="text-gray-700">Price: ₹{fruit.price}</p>
            <p className="text-gray-600">In stock: {fruit.quantity}</p>
            <Link
              href="/order"
              className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              🛒 Order Now
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/owner" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          🔐 Owner Login
        </Link>
        <Link href="/order" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900">
          🛍️ Go to Orders
        </Link>
      </div>
    </div>
  );
}
