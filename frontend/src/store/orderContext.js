import { createContext, useReducer, useContext } from "react";

const OrderContext = createContext();

const initialState = {
  menu: [],
  student: null,
  parent: null,
  cart: {},
  loading: false,
  message: "",
  messageType: "info"
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        menu: action.payload.menu,
        student: action.payload.student,
        parent: action.payload.parent
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: (state.cart[action.payload] || 0) + 1
        }
      };

    case "CLEAR_CART":
      return { ...state, cart: {} };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.type
      };

    case "UPDATE_BALANCE":
      return {
        ...state,
        parent: {
          ...state.parent,
          walletBalance: action.payload
        }
      };

    default:
      return state;
  }
}

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);