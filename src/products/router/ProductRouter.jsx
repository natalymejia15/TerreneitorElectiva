import { Navigate, Routes, Route } from "react-router-dom";
import { NewProduct } from "../pages";
import { Navbar } from "~/ui";
import { ProductSelect } from "../pages/ProductSelect";

export const ProductRouter = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/NewProduct" element={<NewProduct />} />
          <Route path="/ProductSelect" element={<ProductSelect />} />
          <Route path="/" element={<Navigate to="/HomeProduct" />} />
        </Routes>
      </div>
    </>
  );
};
