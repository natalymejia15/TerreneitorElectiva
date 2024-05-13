import { useReducer, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { productReducer } from "../reducers/ProductReducer";
import { FirebaseDB } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { ProductTypes } from "../types/Types";

const initialState = {
  products: [],
};

const init = () => {
  return {
    products: [],
  };
};

export const ProductProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(
    productReducer,
    initialState,
    init
  );

  const saveProduct = async (product) => {
    const newDoc = doc(
      collection(FirebaseDB, `products`)
    );
    await setDoc(newDoc, product);
    product.id = newDoc.id;
    const action = { payload: product, type: ProductTypes.saveProduct };
    dispatch(action);
  };

  return (
    <ProductContext.Provider
      value={{
        ...productState,
        saveProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
