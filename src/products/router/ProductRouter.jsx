import { Navigate, Routes, Route } from "react-router-dom";
import { HomeProduct, NewProduct } from "../pages";
import { Navbar } from "~/ui";
import { ProductSelect } from "../pages/ProductSelect";
import { Profile } from "~auth/pages/Profile";

export const ProductRouter = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/NewProduct" element={<NewProduct />} />
          <Route path="/ProductSelect" element={<ProductSelect />} />
          <Route path="/" element={<HomeProduct />}/>
          <Route path="/HomeProduct" element={<HomeProduct />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};
