import React, { useEffect, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { FirebaseDB } from "~firebase/config";
import { collection, getDocs, doc, query, orderBy } from "firebase/firestore/lite";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const orderByField = 'userId'; 
        const queryProduct = query(collection(FirebaseDB, 'products'), orderBy(orderByField));
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
        {products.map((product) => (
          <div key={product.id}>
            <ProductItem {...product} />
            <hr className="my-4 border-t" />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;