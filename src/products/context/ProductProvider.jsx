import { useReducer, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { productReducer } from "../reducers/ProductReducer";
import { FirebaseDB } from "../../firebase/config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore/lite";
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

  const saveComment = async (comment) => {
    const commentDoc = doc(
      collection(FirebaseDB, `comments`)
    );
    await setDoc(commentDoc, comment);
    comment.id = commentDoc.id;
    const action = { payload: comment, type: ProductTypes.saveComment };
    dispatch(action);
  };

  const updateProduct = async (product)=>{
    const updateDocs=doc(FirebaseDB,"products", product.id);
    await updateDoc(updateDocs, product);
    const action = { payload: product, type: ProductTypes.updateProduct };
    dispatch(action);
  };

  const updateProductRate = async (productId, newRate) => {
      const updateDocs = doc(FirebaseDB, "products", productId);
      await updateDoc(updateDocs, { rate: newRate });
      const action = { payload: productId, type: ProductTypes.updateProductRate };
      dispatch(action);
  };

  return (
    <ProductContext.Provider
      value={{
        ...productState,
        saveProduct,
        saveComment,
        updateProduct,
        updateProductRate,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
