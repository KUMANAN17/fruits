import { useEffect, useState } from 'react';


function FruitCard({ fruit, onOrder }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '8px' }}>
      <h3>{fruit.name}</h3>
      <p>Price: ₹{fruit.price}</p>
      <p>Available Quantity: {fruit.quantity}</p>

      <button
        onClick={() => onOrder(fruit)}
        className='bg-green-500 text-white py-2 px-4 rounded-4xl'
        type="submit"
      >
        Order
      </button>
    </div>
  );
}

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
    console.log("Selected fruit:", fruit);
    setSelectedFruit(fruit);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const total = selectedFruit.price * quantity;
    const order = {
      Fruitsname: selectedFruit.name,
      price: selectedFruit.price,
      Quantity: quantity,
      Total: total,
    };
    setOrderDetails(order);
    console.log("Order submitted:", order);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🍎 Order Fruits </h1>
      {!selectedFruit ? (
        <>
          {fruits.map((fruit, index) => (
            <FruitCard key={index} fruit={fruit} onOrder={handleOrderClick} />
          ))}
        </>
      ) : (
        <form onSubmit={handleSubmitOrder}>
          <h3>Selected Fruit: {selectedFruit.name}</h3>
          <p>Price: ₹{selectedFruit.price}</p>
          <p>Available Quantity: {selectedFruit.quantity}</p>
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
          <button className='bg-green-500 text-white py-2 px-4 rounded-4xl'type="submit">Place Order</button>
        </form>
      )}

      {orderDetails && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>✅ Order Placed</h3>
          <p>Fruit: {orderDetails.name}</p>
          <p>Quantity: {orderDetails.Quantity}</p>
          <p>Total: ₹{orderDetails.Total}</p>
          <p>Thank you for your order!</p>
        </div>
      )}
    </div>
  );
}
