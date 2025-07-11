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
      <nav>
        <Link href="/">Home</Link> | <Link href="/order">Order</Link>
      </nav>
    </header>
  );
}
