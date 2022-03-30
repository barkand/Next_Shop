import {
  CART_ADD_ITEM,
  CART_REDUCE_ITEM,
  CART_REMOVE_ALL_ITEMS,
  CART_CHECKOUT,
} from "/src/redux/actions/actionTypes";

const initialState = {
  addedIds: [],
  products: {},
  sum: 0,
  sumOff: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        addedIds:
          state.addedIds.indexOf(action.product.id) !== -1
            ? state.addedIds
            : [...state.addedIds, action.product.id],

        products: {
          ...state.products,
          [action.product.id]: {
            ...state.products[action.product.id],
            title: action.product.title,
            price: action.product.price,
            offPrice: action.product.offPrice,
            formatPrice: action.product.formatPrice,
            formatOffPrice: action.product.formatOffPrice,
            image: action.product.image,
            quantity: (state.products[action.product.id]?.quantity || 0) + 1,
            sumPrice:
              action.product.price *
              ((state.products[action.product.id]?.quantity || 0) + 1),
            sumOffPrice:
              action.product.offPrice *
              ((state.products[action.product.id]?.quantity || 0) + 1),
            slug: action.product.slug,
          },
        },

        sum: state.sum + action.product.price,

        sumOff:
          state.sumOff +
          (action.product.offPrice === 0
            ? action.product.price
            : action.product.offPrice),
      };

    case CART_REDUCE_ITEM:
      return {
        addedIds:
          state.products[action.product.id]?.quantity > 1
            ? state.addedIds
            : state.addedIds.filter((id) => id !== action.product.id),

        products:
          state.products[action.product.id]?.quantity > 1
            ? {
                ...state.products,
                [action.product.id]: {
                  ...state.products[action.product.id],
                  title: action.product.title,
                  price: action.product.price,
                  offPrice: action.product.offPrice,
                  formatPrice: action.product.formatPrice,
                  formatOffPrice: action.product.formatOffPrice,
                  image: action.product.image,
                  quantity:
                    (state.products[action.product.id]?.quantity || 0) - 1,
                  sumPrice:
                    action.product.price *
                    ((state.products[action.product.id]?.quantity || 0) - 1),
                  sumOffPrice:
                    action.product.offPrice *
                    ((state.products[action.product.id]?.quantity || 0) - 1),
                  slug: action.product.slug,
                },
              }
            : { ...state.products, [action.product.id]: undefined },

        sum: state.sum - action.product.price,

        sumOff:
          state.sumOff -
          (action.product.offPrice === 0
            ? action.product.price
            : action.product.offPrice),
      };

    case CART_REMOVE_ALL_ITEMS:
      return {
        addedIds: state.addedIds.filter((id) => id !== action.product.id),

        products: { ...state.products, [action.product.id]: undefined },

        sum:
          state.sum -
          (action.product.price * state.products[action.product.id]?.quantity ||
            0),

        sumOff:
          state.sumOff -
          ((action.product.offPrice === 0
            ? action.product.price
            : action.product.offPrice) *
            state.products[action.product.id]?.quantity || 0),
      };

    case CART_CHECKOUT:
      return initialState;

    default:
      return state;
  }
};

export default cart;
