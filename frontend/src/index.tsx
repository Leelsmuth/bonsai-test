import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore, compose, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import {
  productReducer, cartReducer
} from "./state/reducer";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { CartProvider } from "./cart-context";

const bigReducer = combineReducers({
  productsList: productReducer,
  cart: cartReducer
});

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<any> = createStore(
  bigReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
