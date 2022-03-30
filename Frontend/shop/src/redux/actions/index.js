import * as types from "/src/redux/actions/actionTypes";
import { SetJsonLocalStorage } from "/src/localStorage";
import {
  addCart,
  removeCart,
  removeAllCart,
} from "/src/network/fetchData/shop";

export const addToCart =
  (product, sync = true) =>
  async (dispatch, getState) => {
    dispatch({
      type: types.CART_ADD_ITEM,
      product,
    });

    SetJsonLocalStorage("cart", getState().cart);
    if (sync) {
      await addCart(product.id, product.price);
    }
  };

export const removeFromCart = (product) => async (dispatch, getState) => {
  dispatch({
    type: types.CART_REDUCE_ITEM,
    product,
  });

  SetJsonLocalStorage("cart", getState().cart);
  await removeCart(product.id);
};

export const removeAllFromCart = () => async (dispatch, getState) => {
  dispatch({
    type: types.CART_REMOVE_ALL_ITEMS,
  });

  SetJsonLocalStorage("cart", getState().cart);
  await removeAllCart(product.id);
};

export const checkout = () => async (dispatch, getState) => {
  dispatch({
    type: types.CART_CHECKOUT,
  });

  SetJsonLocalStorage("cart", getState().cart);
};
