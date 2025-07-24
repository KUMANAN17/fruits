'use client';
import Header from '../components/common/Header';
import OrderPage from '../components/pages/Homepage'; // adjust if needed

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <Header />
      <h1></h1>
      <OrderPage />
    </main>
  );
}