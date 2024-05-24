import { doc, getDoc } from "firebase/firestore";
import { FirebaseDB } from '../../firebase/config';
import { useState  } from 'react';

export const GetProduct = () => {
  const [product, setProduct] = useState(null);


  const getProductById = async (productId) => {
    try {
      const productRef = doc(FirebaseDB, "products", productId);
      const productRate = await getDoc(productRef);
      if (productRate.exists()) {
        setProduct({ ...productRate.data(), id: productRate.id });
      } else {
        console.error("No such product!");
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
      setProduct(null);
    }
  };

  return { product, getProductById };
};
