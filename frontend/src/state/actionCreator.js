import bonsaiApi from "../utils/apiUtil";
import * as types from "./actionTypes";

export const getProducts = () => {
  return (dispatch) => {
    dispatch({ type: types.PRODUCTS_START });
    return bonsaiApi
      .get("/products")
      .then((res) => {
        let data = res.data.products;
        dispatch({ type: types.PRODUCTS_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({
          type: types.PRODUCTS_FAILURE,
          payload: err.response,
        });
      });
  };
};

// to delete the indv. elements from an Item Cart
export const removeItem = (id) => (dispatch) => {
  return dispatch({
    type: types.CART_REMOVE_ITEM,
    payload: id,
  });
};

export const addToCart = (id) => async (dispatch) => {

  dispatch({
    type: types.ADD_TO_CART,
    payload: id
  });

};

// clear the cart
export const clearCart = () => (dispatch) => {
  return dispatch({ type: types.CLEAR_CART, });
};

// increment the item
export const increment = (id) => (dispatch) => {
  return dispatch({
    type: types.INCREMENT_ITEM,
    payload: id,
  });
};

// decrement the item
export const decrement = (id) => (dispatch) => {
  return dispatch({
    type: types.DECREMENT_ITEM,
    payload: id,
  });
};