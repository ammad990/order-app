import { useEffect, useMemo } from "react";
import { useOrder } from "../store/orderContext";
import { fetchAppData, createOrder } from "../services/api";
import { styles } from "../styles/orderStyles";

function Order() {
    const { state, dispatch } = useOrder();
    const { menu, student, parent, cart, loading, message, messageType } = state;

    useEffect(() => {
        const loadData = async () => {
        try {
            const [m, s, p] = await fetchAppData();
            dispatch({
                type: "SET_DATA",
                payload: {
                    menu: m.data,
                    student: s.data,
                    parent: p.data
                }
            });
        }
        catch (err) {
            dispatch({
                type: "SET_MESSAGE",
                payload: { message: "Failed to load data", type: "error" }
            });
        }
    };

    loadData();
    }, [dispatch]);


    const addToCart = (id) => {
        dispatch({
            type: "SET_MESSAGE",
            payload: { message: "", type: "info" }
        });
        dispatch({ type: "ADD_TO_CART", payload: id });
    };

    const hasAllergenItem = (item) => {
        return item.allergens.some(a =>
            student?.allergens?.includes(a)
        );
    };

    const isItemAvailable = (item) => !item.available;
    const cartItemsCount = Object.keys(cart).length;
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
        dispatch({
            type: "SET_MESSAGE",
            payload: { message: "", type: "info" }
        });
    };
    
    const cartTotal = useMemo(() => {
        return Object.entries(cart).reduce((total, [id, qty]) => {
            const item = menu.find(m => m.id === Number(id));
            return item ? total + item.price * qty : total;
        }, 0);
    }, [cart, menu]);

    const placeOrder = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const items = Object.entries(cart).map(([id, qty]) => ({
                menuItemId: Number(id),
                quantity: qty
            }));

        const res = await createOrder({
            studentId: student.id,
            items
        });

        dispatch({
            type: "SET_MESSAGE",
            payload: {
                message: `Order placed! Balance: $${res.data.balance}`,
                type: "success"
            }
        });

        dispatch({ type: "CLEAR_CART" });
        dispatch({ type: "UPDATE_BALANCE", payload: res.data.balance });

    } catch (err) {
        dispatch({
            type: "SET_MESSAGE",
            payload: {
                message: err.response?.data?.message || "Error",
                type: "error"
            }
      });
    }

    dispatch({ type: "SET_LOADING", payload: false });
  };

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
            {cartItemsCount > 0 && (
            <button style={styles.cartBtn} onClick={clearCart}>
                Clear Cart
            </button>
            )}
            <button  onClick={placeOrder} disabled={loading || cartItemsCount === 0}>
                {loading ? "Placing..." : "Place Order"}
            </button>
        </div>
        { message && <p style={{color: styles[messageType].color }}>{message}</p> }
    </div>
  );
}

export default Order;