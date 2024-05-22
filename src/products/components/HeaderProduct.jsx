import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseDB } from "~firebase/config";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore/lite";
import { FaThumbsUp } from "react-icons/fa";
import { Star } from "./Star";

export const HeaderProduct = () => {
  const [maxRate, setMaxRate] = useState([]);

  const getProductRate = async () => {
    const queryRates = query(
      collection(FirebaseDB, "products"),
      orderBy("rate", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(queryRates);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setMaxRate(docs);
  };

  useEffect(() => {
    getProductRate();
  }, []);

  return (
    <>
      {maxRate.map((products) => (
        <div
          key={products.id}
          className="md:flex max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-3"
        >
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={products.image}
              alt=""
            />
          </div>
          <div className="p-8 ml-4">
            <NavLink
              to={`/products/${products.id}`}
              className="uppercase tracking-wide font-semibold text-violet-600 hover:text-violet-900"
            >
              {products.name}
            </NavLink>

            <a
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              href="#"
            >
              {products.category}
            </a>
            <p className="mt-2 text-gray-500">{products.description}</p>
            <div className="flex items-center">
              <p className="tracking-wide text-sm text-violet-900 font-semibold">
                Higher Rate {products.rate}{" "}  
              </p>
              <FaThumbsUp className="ml-2 text-yellow-500" />
            </div>
            <br />
            <div className="flex justify-center">
              <NavLink
                to={products.url}
                target="_blank"
                rel="noreferrer noopener"
                className="bg-violet-800 hover:bg-gray-400 text-white font-bold py-2 px-4 border border-violet-800 rounded"
              >
                Get Product
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
