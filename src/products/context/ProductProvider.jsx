import { useReducer } from "react";
import { productReducer } from "~products/reducers";
import { AuthContext } from "~auth/context";
import { firebaseDB } from '../../firebase/config'
import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { ProductTypes } from "../types";
import { ProductContext } from "./ProductContext";

const initialState = { 
  product:[] 
};

export const ProductProvider = ({ children }) => {
  
  const [productState, dispatch ] = useReducer(productReducer, initialState);

  const { user }= useContext(AuthContext)

  const saveProduct = async(product) => {
    try{
      const newDoc = doc(collection(firebaseDB, '${user.uid}/product_hunt/products'));
      await setDoc(newDoc, product);
      product.id = newDoc.id
      const action= { type: ProductTypes.saveProduct, payload: product}
      dispatch(action);

    } catch (error){
      console.log(error);
    }
  }

  return (
    <ProductContext.Provider value={
      {
        ...productState,
        saveProduct
      }
    }
    >
      { children }
    </ProductContext.Provider>
  )
}
