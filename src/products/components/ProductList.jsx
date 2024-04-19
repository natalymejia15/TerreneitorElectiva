import React, { useEffect, useState } from "react";
import { ProductItem } from "../components/ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch the list of products and set the data
  useEffect(() => {
    fetch(`https://product-hunt-18dcc2.can.canonic.dev/api/products`)
      .then((res) => res.json())
      .then((json) => json?.data)
      .then((products) =>
        Array.isArray(products) ? setProducts(products) : null
      );
  }, []);

  return (
    <div>
      <h5 className="text-xl mt-6 mb-4 text-gray-700 hover:text-blue-600">Products</h5>

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
