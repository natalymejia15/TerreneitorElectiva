import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { collection, getDocs, doc, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";
import { ProductItemLogin } from "./ProductItemLogin";

export const Products = (props) => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const showProducts = props.show;
  useEffect(() => {
    const getList = async () => {
      try {
          const fieldName = 'userId'; 
          const searchValue = user.uid;
          const queryProduct = query(collection(FirebaseDB, 'products'), where(fieldName, '==', searchValue));
          const querySnapshot = await getDocs(queryProduct);
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
            <ProductItemLogin show={showProducts} {...products} />
            <hr className="my-4 border-t" />
          </div>
        ))}
      </ul>
    </div>
  );
};
