import { ProductTypes } from "~products/types";

export const productReducer = ( { state={}, action } ) => {
    switch (action.type) {
        case ProductTypes.saveProduct:
            return{
                ...state,
                product : state.product.push(action.payload)
            }
        default:
            return state;
    }
}