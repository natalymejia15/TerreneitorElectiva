import React, { useState, useEffect } from "react";
import { FirebaseDB } from "~firebase/config";
import { Link, useParams } from "react-router-dom";
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
    return <div className="text-center mt-8 text-gray-800">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-8 text-gray-800">No product found.</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl mt-8 p-8 bg-white rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex justify-center md:justify-end max-w-sm">
      <div className="w-25 h-50">
      <img
  src={product.image}
  alt={product.name}
  style={{ width: "350px", height: "320px" }}
  className="object-cover rounded-lg shadow-md"
/>

</div>

        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center text-gray-700 mb-4">
            <span className="mr-2">User:</span>
            <Link to={`/users/${product.userId}`} className="text-violet-700 hover:underline">
              {product.displayName}
            </Link>
          </div>
          <p className="text-gray-700 mb-4">Rate: {product.rate}</p>
          <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-violet-700 hover:underline">
            Visit Website
          </a>
        </div>
      </div>
      <div className="mt-8">
        <Comments productId={id} />
      </div>
    </div>
  );
};
