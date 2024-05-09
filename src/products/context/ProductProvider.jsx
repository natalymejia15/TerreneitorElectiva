import { useReducer, useState, useContext } from "react";
import { productReducer } from "~products/reducers";
import { AuthContext } from "~auth/context";
import { FirebaseDB } from '../../firebase/config'
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc } from 'firebase/firestore/lite'
import { ProductTypes } from "../types";
import { ProductContext } from ".";

const initialState = { 
  products: [] 
}

export const ProductProvider = ({ children }) => {
  
  const [productState, dispatch ] = useReducer(productReducer, initialState);
  //const [products, SetProducts]=useState([]);
  const { user }= useContext(AuthContext);

  //const productsCollection = collection(FirebaseDB, 'products')

  const saveProduct = async(product) => {
    try{
      const newDoc = doc(collection(FirebaseDB, '${user.uid}/product_hunt/products'));
      await setDoc(newDoc, product);
      product.id = newDoc.id
      const action= { type: ProductTypes.saveProduct, payload: product}
      dispatch(action);

    } catch (error){
      console.log(error);
    }
  }

  //const showProduct =async (product)=>{
  //  const dataProducts= await getDocs(productsCollection);
  //  console.log(dataProducts.docs)
  //  SetProducts(
  //    dataProducts.docs.map((doc) =>({...doc.data(), id: doc.id}))
  //  )

  //}

  return (
    <ProductContext.Provider value={
      {
        ...productState,
        saveProduct,     
      }
    }>
      { children }
    </ProductContext.Provider>
  )
}
