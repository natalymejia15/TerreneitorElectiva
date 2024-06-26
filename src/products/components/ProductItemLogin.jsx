import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FirebaseDB } from "~firebase/config";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { HandleUpvote } from "./HandleUpvote";
import { useNavigate } from "react-router";
import { Star } from "./Star";
import Swal from "sweetalert2";

export const ProductItemLogin = ({
  name,
  description,
  rate,
  image,
  userId,
  url,
  id,
  displayName,
  show,
}) => {
  const [upvotes, setUpvotes] = React.useState(0);
  const firstLetter = name.charAt(0).toUpperCase();
  const navigate = useNavigate();
  const showProductItem = show;

  const handleUpvoteChange = (value) => {
    setUpvotes(value);
  };

  const deleteProduct = async () => {
    try {
      const productDoc = doc(FirebaseDB, "products", id);
      await deleteDoc(productDoc);
      navigate("/MyProducts");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct();
        Swal.fire("Deleted!", "This product has been deleted.", "success");
      }
    });
  };

  return (
    <div className="md:flex max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-3 relative">
      {image ? (
        <div className="flex items-center">
          <div className="w-20 h-24 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt={firstLetter}
              src={image}
            />
          </div>
          <div className="flex-1 p-4">
            <NavLink
              to={`/products/${id}`}
              className="uppercase tracking-wide font-semibold text-violet-600 hover:text-violet-900"
            >
              {name}
            </NavLink>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-200">
              {description}
            </p>
            <div className="flex items-center">
              <p className="text-gray-600">User: {displayName}</p>              
              <p className="text-gray-600">&nbsp;&nbsp;&nbsp;&nbsp;Rate: {rate} &nbsp;</p>
              <Star rate={rate} />  
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full flex justify-center items-center bg-violet-900">
            <span className="text-white text-3xl">{firstLetter}</span>
          </div>
          <div className="flex-1 p-4">
            <div className="uppercase tracking-wide font-semibold text-violet-600 hover:text-violet-900">
              {name}
            </div>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-200">
              {description}
            </p>
            <div>
              <p className="text-gray-600">Rate: {rate}</p>
              <p className="text-gray-600">User: {displayName}</p>
            </div>
          </div>
        </div>
      )}
      <div className="absolute top-2 right-2">
        {showProductItem ? (
          <div className="flex">
            <Link
              to={`/ViewProduct/${id}`}
              className="mt-2 mr-2 bg-violet-500 text-white px-3 py-1 text-sm"
            >
              Edit
            </Link>
            <button
              onClick={confirmDelete}
              className="mt-2 mr-2 bg-violet-500 text-white px-3 py-1 text-sm"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="bg-violet-500 hover:bg-violet-400 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center">
            <HandleUpvote id={id} onUpvoteChange={handleUpvoteChange} />
            {upvotes}
          </div>
        )}
      </div>
    </div>
  );
};
