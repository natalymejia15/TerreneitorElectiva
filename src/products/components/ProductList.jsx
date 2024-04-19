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
