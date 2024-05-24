import { useState } from "react";
import { HeaderProduct } from "~products/components/HeaderProduct";
import { Products } from "~products/components/Products";

export const HomeProduct = () => {
  const [showProducts, setShowProducts] = useState(true);
  return (
    <>
      <HeaderProduct />
      <hr />
      <Products showHunter={showProducts} />
    </>
  );
};
