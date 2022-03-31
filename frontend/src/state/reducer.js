import * as types from './actionTypes';

// initial photo state
const initialProducts = {
  products: [],
  isFetching: false,
  error: null,
};

export const productReducer = (state = initialProducts, action) => {
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
  items: []
};

export const cartReducer = (state = initialCart, action) => {
  let doesItemExist;
  switch (action.type) {
    case types.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.items.find(x => x.id === item.id);

      if (existItem) {
        return {

          ...state,
          items: state.items.map(x => x.id === existItem.id ? item : x)
        };

      } else {
        return {
          ...state,
          items: [...state.items, item]
        };
      }

    case types.CART_REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((curElem) => {
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
      const newState = state.items.map((item) => {
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
      const newReducedState = state.items.map((item) => {
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
          items: state.items.filter((curElem) => {
            return curElem.id !== action.payload.id;
          }),
        };
      }
    case types.GET_TOTAL:
      let { totalItem, totalAmount } = state.items.reduce(
        (accum, curVal) => {
          let { price, quantity } = curVal;

          let updatedTotalAmount = price * quantity;
          accum.totalAmount += updatedTotalAmount;

          accum.totalItem += quantity;
          return accum;
        },
        {
          totalItem: 0,
          totalAmount: 0,
        },
      );
      return { ...state, totalItem, totalAmount };
    default:
      return state;
  }
};
