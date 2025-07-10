import { useEffect, useState } from 'react';
import Header from '../components/common/Header';

export default function OrderPage() {
  const [fruits, setFruits] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);
  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/fruits/")
      .then((res) => res.json())
      .then((data) => {
        setFruits(data);
      })
      .catch((error) => {
        console.error("Error fetching fruits:", error);
      });
  }, []);

  const handleOrderClick = (fruit) => {
    setSelectedFruit(fruit);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const total = selectedFruit.price * quantity;
    const order = {
      Fruitsname: selectedFruit.Fruitsname,
      price: selectedFruit.price,
      Quantity: quantity,
      Total: total,
    };
    setOrderDetails(order);
    console.log("Order submitted:", order);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🍎 Order Fruits</h1>
      {!selectedFruit ? (
        <>
          {fruits.map((fruit, index) => (
            <FruitCard key={index} fruit={fruit} onOrder={handleOrderClick} />
          ))}
        </>
      ) : (
        <form onSubmit={handleSubmitOrder}>
          <h3>Selected Fruit: {selectedFruit.Fruitsname}</h3>
          <p>Price: ₹{selectedFruit.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <br /><br />
          <button type="submit">Place Order</button>
        </form>
      )}

      {orderDetails && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>✅ Order Placed</h3>
          <p>Fruit: {orderDetails.Fruitsname}</p>
          <p>Quantity: {orderDetails.Quantity}</p>
          <p>Total: ₹{orderDetails.Total}</p>
        </div>
      )}
    </div>
  );
}
