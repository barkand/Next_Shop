import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducers from "/src/redux/reducers";
import { GetJsonLocalStorage } from "/src/localStorage";

function ReduxProvider({ children }) {
  //** Read From LocalStorage
  const cartStorage = GetJsonLocalStorage("cart");

  //** initial State with LocalStorage
  const initialState = {
    cart: {
      addedIds: cartStorage.addedIds || [],
      products: { ...cartStorage.products },
      sum: cartStorage.sum || 0,
      sumOff: cartStorage.sumOff || 0,
    },
  };

  const Middleware = [];
  Middleware.push(thunk);

  const store = createStore(
    rootReducers,
    initialState,
    process.env.NODE_ENV !== "production"
      ? composeWithDevTools(applyMiddleware(...Middleware))
      : applyMiddleware(...Middleware)
  );

  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
