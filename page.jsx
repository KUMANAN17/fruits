export default function Homepages({ fruit, onOrder }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
      <h3>{fruit.Fruitsname}</h3>
      <p>Price: ₹{fruit.price}</p>
      <button onClick={() => onOrder(fruit)}>Order</button>
    </div>
  );
}
