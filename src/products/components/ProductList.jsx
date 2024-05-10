import React, { useEffect, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { FirebaseDB } from "~firebase/config";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const getList= async () => {
      try{
        const querySnapshot = await getDocs(collection(FirebaseDB, 'products'))
        const docs =[]
        querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id: doc.id})
        })
        setProducts(docs)
      } catch (error) {
        console.log(error)
      }
    }
    getList();
  }, [products])

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
