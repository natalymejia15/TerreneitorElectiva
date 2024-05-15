import React from "react";
import UpvoteButton from "../components/UpvoteButton";
import { NavLink, useNavigate } from "react-router-dom";
import { FirebaseDB } from "~firebase/config";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { ViewProduct } from "./ViewProduct";

export const ProductItemLogin = ({
  name,
  description,
  rate,
  image,
  upvotes = "0",
  isUpvoted = false,
  id,
  show,
}) => {
  const [upvoted, setUpvoted] = React.useState(isUpvoted);
  const firstLetter = name.charAt(0).toUpperCase();
  const showProductItem = show;
  const navigate = useNavigate();

  const handleUpvote = () => {};

  const deleteProduct = async () => {
    const productDoc = doc(FirebaseDB, "products", id);
    await deleteDoc(productDoc);
    navigate("/MyProduct", { reload: true });
  };

  const confirmDelete = () => {
    Myswal.fire({
      title: "Are you sure?",
      text: "You won't be",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isComfirmed) {
        deleteProduct();
        SwitchLabel.fire(
          "Deleted!",
          "This product has been deleted.",
          "success"
        );
      }
    });
  };

  return (
    <div className="md:flex max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-3">
      {image ? (
        <div className="flex items-center">
          <div className="w-24 h-24 overflow-hidden bg-violet-900">
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
          </div>
        </div>
      )}
      <div className="ml-auto">
        {showProductItem ? (
          <div className="flex ml-auto">
            <button
              className="mt-2 mr-2 bg-violet-500 text-white px-3 py-1 text-sm"
              onClick={<ViewProduct />}
            >
              Edit
            </button>
            <button
              onClick={confirmDelete}
              className="mt-2 mr-2 bg-violet-500 text-white px-3 py-1 text-sm"
            >
              Delete
            </button>
          </div>
        ) : (
          <UpvoteButton
            upvoted={upvoted}
            variant="outlined"
            disableRipple={true}
            onclick={handleUpvote}
          >
            {upvotes}
          </UpvoteButton>
        )}
      </div>
    </div>
  );
};
