
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { FirebaseDB } from '../../firebase/config';
import { useState, useEffect } from 'react';

export const GetProduct = () => {
  const [product, setProduct] = useState(null);

  const updateProductRate = async (productId, newRate) => {
    try {
      const productRef = doc(FirebaseDB, "products", productId);
      await updateDoc(productRef, { rate: newRate });
      console.log("Rate updated successfully");
    } catch (error) {
      console.error("Error updating rate: ", error);
    }
  };

  const getProductById = async (productId) => {
    try {
      const productRef = doc(FirebaseDB, "products", productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setProduct({ ...productSnap.data(), id: productSnap.id });
      } else {
        console.error("No such product!");
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
      setProduct(null);
    }
  };

  return { product, updateProductRate, getProductById };
};
