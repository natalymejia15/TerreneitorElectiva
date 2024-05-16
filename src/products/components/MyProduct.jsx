import { useState } from "react";
import { Link } from "react-router-dom";
import { Products} from './Products';

export const MyProduct = () => {
  const [showNewProduct, setShowNewProduct] = useState(true);
  const [showProducts, setShowProducts] = useState(true);

  const handleShowAllProducts = () => {
    setShowNewProduct(false);
    setShowProducts(true);
  };

  return (
    <>
      <div className="mx-auto h-screen">
        <div className="rounded-lg">
          <div className="container px-6 text-gray-500 md:px-12 xl:em-0">
            <div className="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">
              <div className="w-30vw bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
                <div className="mb-12 space-y-4 ">
                  <h4 className="text-2xl font-semibold text-violet-900">
                    My products & launches
                  </h4>
                  <p className="mb-6">LAUNCHES</p>
                  <ul className="mt-2 text-gray-700">
                    <li
                      className="flex border-y py-2 cursor-pointer"
                      onClick={handleShowAllProducts}
                    >
                      All my products
                    </li>
                    <li className="flex border-y py-2 cursor-pointer">
                      <Link to="/NewProduct">New Product</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-70vw bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
            {showNewProduct ? (
              <div className="mb-12 space-y-4">
                <h3 className="text-2xl font-semibold text-violet-900 justify-center ">
                  Looks like you don't have any posts yet
                </h3>
                <Link to="/NewProduct">
                  <button className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md">
                    New Product
                  </button>
                </Link>
              </div>
            ) : (
              <Products show={showProducts} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
