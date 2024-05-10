import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { ProductItem } from "../components/ProductItem";
import { collection, getDocs, doc } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(FirebaseDB, `${user.uid}/product_hunt/products`));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setProducts(docs);
        console.log(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, []);
 
  return (
    <div className="mr-10 ml-10 mb-2">
      <ul>
        {products.map((products) => (
          <div key={products.id}>
            <ProductItem {...products} />
            <hr className="my-4 border-t" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
