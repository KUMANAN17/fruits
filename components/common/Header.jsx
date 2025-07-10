import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <h2>Fruit Shop</h2>
      <nav>
        <Link href="/">Home</Link> | <Link href="/order">Order</Link>
      </nav>
    </header>
  );
}
