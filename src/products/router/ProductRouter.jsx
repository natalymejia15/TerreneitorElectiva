import { Routes, Route } from "react-router-dom";
import { HomeProduct, NewProduct, MyProducts } from "../pages";
import { Navbar } from "~/ui";
import { ProductSelect } from "../pages/ProductSelect";
import { Profile } from "~auth/pages/Profile";
import { ViewProduct } from "~products/pages/ViewProduct";
import { EditProfile } from "../../auth/pages/EditProfile";

export const ProductRouter = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/NewProduct" element={<NewProduct />} />
          <Route path="/products/:id" element={<ProductSelect />} />
          <Route path="/products/:category" element={<HomeProduct />} />
          <Route path="/" element={<HomeProduct />}/>
          <Route path="/HomeProduct" element={<HomeProduct />} />
          <Route path="/users/:userId" element={<Profile />} /> 
          <Route path="/Profile" element={<Profile />} /> 
          <Route path="/MyProducts" element={<MyProducts />} />
          <Route path="/ViewProduct/:id" element={<ViewProduct />} />
          <Route path="/EditProfile/:id" element={<EditProfile/>}/>
        </Routes>
      </div>
    </>
  );
};
