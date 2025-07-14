import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <h2 style={{
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'orange',
  backgroundColor: '#fff0d9',
  padding: '4px 8px',
  borderRadius: '6px'}}>🍎🍊🍇Fruit Shop🍇🍊🍎</h2>
      <nav className="space-x-4">
        <Link className="text-blue-600 hover:underline" href="/">Home</Link>
        <Link className="text-blue-600 hover:underline" href="/order">Order</Link>
        <Link className="text-blue-600 hover:underline" href="/owner">Owner</Link>
      </nav>
    </header>
  );
}
