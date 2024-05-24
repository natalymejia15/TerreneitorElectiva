import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";
import { ProductItemLogin } from "./ProductItemLogin";

export const Products = ({ userId, showProducts, showHunter }) => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getList = async () => {
      try {
        let queryProduct;
        if (showHunter) {
          queryProduct = query(collection(FirebaseDB, 'products'), orderBy('userId'));
        } else {
          const fieldName = 'userId';
          const searchValue = userId || user.uid;
          queryProduct = query(collection(FirebaseDB, 'products'), where(fieldName, '==', searchValue));
        }
        const querySnapshot = await getDocs(queryProduct);
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setProducts(docs);
      } catch (error) {
        console.log(error);
      }
    };

    getList();
  }, [userId, user, showHunter]);

  return (
    <div className="mr-10 ml-10 mb-2">
      <ul>
        {products.map((product) => (
          <div key={product.id}>
            <ProductItemLogin show={showProducts} {...product} />
            <hr className="my-4 border-t" />
          </div>
        ))}
      </ul>
    </div>
  );
};
