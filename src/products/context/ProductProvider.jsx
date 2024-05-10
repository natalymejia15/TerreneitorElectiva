import { useReducer, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { productReducer } from "../reducers/ProductReducer";
import { AuthContext } from "../../auth/context/AuthContext";
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

  const { user } = useContext(AuthContext);

  const saveProduct = async (product) => {
    const newDoc = doc(
      collection(FirebaseDB, `${user.uid}/product_hunt/products`)
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
