import { useState, useEffect } from "react";
import { FirebaseDB } from "~firebase/config";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { Comments } from "./Comments";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(FirebaseDB, "products", id);
        const productData = await getDoc(productDoc);
        if (productData.exists()) {
          setProduct(productData.data());
        } else {
          console.log("No such product!");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-48 object-cover rounded-lg"
        />
        <h3 className="text-lg font-bold mt-4">{product.name}</h3>
        <p className="text-gray-600">Description: {product.description}</p>
        <p className="text-gray-600">User: {product.userId}</p>
        <p className="text-gray-600">Rate: {product.rate}</p>
        <a href={product.url} target="blank" className="text-gray-600 ">
          {product.url}
        </a>
      </div>
      <Comments productId={id}  />
    </div>
  );
};
