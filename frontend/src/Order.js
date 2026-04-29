import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const appUrl = "http://localhost:3000";

function Order() {
  const [menu, setMenu] = useState([]);
  const [student, setStudent] = useState(null);
  const [parent, setParent] = useState(null);
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [menuRes, studentRes, parentRes] = await Promise.all([
        axios.get(`${appUrl}/menu`),
        axios.get(`${appUrl}/student`),
        axios.get(`${appUrl}/parent`)
      ]);

      setMenu(menuRes.data);
      setStudent(studentRes.data);
      setParent(parentRes.data);
    } catch (err) {
      setMessage("Failed to load data");
      setMessageType("error");
    }
  };

  //Add to Cart block
  const addToCart = (itemId) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  // Clear Cart block
  const clearCartItem = () => setCart({});

  const cartTotal = useMemo(() => {
    let total = 0;
    for (const [id, qty] of Object.entries(cart)) {
      const item = menu.find(m => m.id === Number(id));
      if (!item) continue;
      total += item.price * qty;
    }
    return total;
  }, [cart, menu]);

  const cartItemsCount = Object.keys(cart).length;

  // Order Handler
  const placeOrder = async () => {
    setLoading(true);
    setMessage("");

    try {
      const items = Object.entries(cart).map(([id, qty]) => ({
        menuItemId: Number(id),
        quantity: qty
      }));

      const res = await axios.post(`${appUrl}/orders`, {
        studentId: student.id,
        items
      });

      setMessage(
        `Order placed! Remaining wallet balance: $${res.data.balance}`
      );
      setMessageType("success");
      clearCartItem();
      fetchData();

    } catch (err) {
      setMessage(
        `${err.response?.data?.message || "Something went wrong"}`
      );
      setMessageType("error");
    }
    setLoading(false);
  };

  const hasAllergenItem = (item) => {
    return item.allergens.some(a =>
      student?.allergens?.includes(a)
    );
  };

  const isItemAvailable = (item) => !item.available;

  return (
    <div style={styles.container}>
      <h2>Order App</h2>

      <div style={styles.card}>
        <p><b>Wallet:</b> ${parent?.walletBalance ?? 0}</p>
        <p><b>Allergens:</b> {student?.allergens?.join(", ")}</p>
      </div>

      <hr />

      <h4>Items</h4>

      {menu.map(item => (
        <div key={item.id} style={styles.item}>
          <div>
            <b>{item.name}</b> - ${item.price}

            {hasAllergenItem(item) && (
              <span style={styles.error}> <i>(Item contains allergens )</i></span>
            )}

            {!item.available && (
              <span style={styles.gray}> (Unavailable)</span>
            )}
          </div>

          <button disabled={isItemAvailable(item)} onClick={() => addToCart(item.id)}> Add
          </button>
        </div>
      ))}

      <hr />

      <div style={styles.footer}>
        <h4>Cart Total: ${cartTotal}</h4>
        <button  onClick={placeOrder} disabled={loading || cartItemsCount === 0}>
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>
      {message && <p style={{color: styles[messageType].color }}>{message}</p>}
    </div>
  );
}

// Styles
const styles = {
  container: { padding: 20, maxWidth: 600, margin: "auto", fontFamily: "Arial" },
  card: { padding: 10, border: "1px solid #ddd", borderRadius: 6, marginBottom: 15 },
  item: { marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" },
  error: { color: "red", marginLeft: 10 },
  success: { color: "green" },
  gray: { color: "gray", marginLeft: 10 },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center" }
};

export default Order;