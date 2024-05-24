import { useState, useEffect } from "react";
import { FirebaseDB } from "~firebase/config";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore/lite";

export const ProductDetail = () => {
  const { category, id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = collection(FirebaseDB, "products");
        let productQuery;
        if (category) {
          productQuery = query(productRef, where("category", "==", category), where("id", "==", id));
        } else {
          productQuery = query(productRef, where("id", "==", id));
        }

        const querySnapshot = await getDocs(productQuery);
        querySnapshot.forEach((doc) => {
          setProduct(doc.data());
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [category, id]);

  if (isLoading) {
    return <div className="text-center mt-8 text-gray-800">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-8 text-gray-800">No product found.</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl mt-8 p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <p className="text-gray-700 mb-4">Category: {product.category}</p>
      <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-violet-700 hover:underline">
        Visit Website
      </a>
    </div>
  );
};
