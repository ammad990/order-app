import { OrderProvider } from "./store/orderContext";
import Order from "./components/Order";

function App() {
  return (
    <OrderProvider>
      <Order />
    </OrderProvider>
  );
}

export default App;