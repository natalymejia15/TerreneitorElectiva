import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { collection, getDocs, doc, query, where, orderBy } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";
import { ProductItemLogin } from "./ProductItemLogin";

export const Products = (props) => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const showProducts = props.show;
  const showHunter=props.showHunter;

  useEffect(() => {
    const getList = async () => {
      try {
          let queryProduct;
          if (!showHunter){
            const fieldName = 'userId'; 
            const searchValue = user.uid;
            queryProduct = query(collection(FirebaseDB, 'products'), where(fieldName, '==', searchValue));
          } else {
            const orderByField = 'userId'; 
            queryProduct = query(collection(FirebaseDB, 'products'), orderBy(orderByField));
          }
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
