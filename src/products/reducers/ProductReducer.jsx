import { ProductTypes } from "../types";

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductTypes.saveProduct:
      return {
        ...state,
        products: state.products.push(action.payload),
      };
    case ProductTypes.updateProduct:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            return { ...action.payload };
          }
          return product;
        }),
      };
    default:
      return state;
  }
};
