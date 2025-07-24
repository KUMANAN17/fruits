'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-orange-200 p-4">
      
      <div className="text-center text-5xl font-bold text-blue-600 mb-2">
        🍎 🍊 🍇 Fruit Shop 🍐 🍑 🍓
      </div>

      
      <div className="flex justify-between items-center">
        
        <div className="flex gap-4">
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Home</Link>
          <Link href="/order" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Order</Link>
        </div>

        
        <Link
          href="/owner"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔐 Owner Login
        </Link>
      </div>
    </header>
  );
}
