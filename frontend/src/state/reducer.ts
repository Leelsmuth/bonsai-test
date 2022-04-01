import { Reducer } from 'redux';
import * as types from './actionTypes';

export interface productState {
  isFetching?: boolean;
  products: [];
  error?: null;
}

const initialProducts: productState = {
  products: [],
  isFetching: false,
  error: null,
};

export const productReducer: Reducer<productState> = (state = initialProducts, action) => {
  switch (action.type) {
    case types.PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case types.PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: action.payload,
      };
    case types.PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialCart = {
  items: [],
};

export const cartReducer: Reducer<any> = (state = initialCart, action) => {
  let doesItemExist;
  switch (action.type) {
    case types.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.items.find((x: any) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          items: state.items.map((x: any) => (x.id === existItem ? item : x)),
        };
      } else {
        return {
          ...state,
          items: [...state.items, item],
        };
      }

    case types.CART_REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((curElem: any) => {
          return curElem.id !== action.payload.id;
        }),
      };
    case types.CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    case types.INCREMENT_ITEM:
      doesItemExist = false;
      const addedItem = action.payload;
      const newState = state.items.map((item: any) => {
        if (item.id === addedItem.id) {
          item.quantitySelected += 1;
          doesItemExist = true;
        }
        return item;
      });
      if (doesItemExist) {
        return { ...state, newState };
      } else {
        return {
          ...state,
          items: [...state.items, addedItem],
        };
      }
    case types.DECREMENT_ITEM:
      const reducedItem = action.payload;
      const newReducedState = state.items.map((item: any) => {
        if (item.id === reducedItem.id && item.quantitySelected > 1) {
          item.quantitySelected -= 1;
          doesItemExist = true;
        }
        return item;
      });
      if (doesItemExist) {
        return { ...state, newReducedState };
      } else {
        return {
          ...state,
          items: state.items.filter((curElem: any) => {
            return curElem.id !== action.payload.id;
          }),
        };
      }
    default:
      return state;
  }
};
