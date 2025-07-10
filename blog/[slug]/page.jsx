// pages/order.jsx
import { useState } from "react";

export default function FruitOrderPage() {
  const [fruit, setFruit] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(`Ordered ${quantity} ${fruit}(s)`);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍉 Fruit Order Page</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Choose a fruit:
          <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
            <option value="">--Select--</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="mango">Mango</option>
            <option value="orange">Orange</option>
          </select>
        </label>
        <br /><br />

        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br /><br />

        <button type="submit">Submit Order</button>
      </form>

      {submitted && (
        <p style={{ color: "green", marginTop: "20px" }}>
          ✅ Order submitted: {quantity} {fruit}(s)
        </p>
      )}
    </div>
  );
}
