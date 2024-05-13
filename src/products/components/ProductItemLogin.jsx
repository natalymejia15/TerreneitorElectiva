import React from 'react'
import UpvoteButton from "../components/UpvoteButton";
import { NavLink, useNavigate } from "react-router-dom";
import { FirebaseDB } from '~firebase/config';
import { deleteDoc, doc } from 'firebase/firestore/lite';

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

  const handleUpvote = () => {

  };

  const deleteProduct = async ()=>{
    console.log({id});
    const productDoc=doc(FirebaseDB, 'products',id);
    await deleteDoc(productDoc);
    navigate("/MyProduct", { reload: true })
  };

  const handleEditProduct = ()=>{
    
    navigate("/NewProduct", {
      state: {
        name,
        description,
        rate,
        image,
        id,
        showEdit:true,
      }           
    });

  }

  return (
    <div className="md:flex max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-3">
      {image ? (
        <div className="flex items-center">
          <div className="w-24 h-24 overflow-hidden bg-violet-900">
            <img className="w-full h-full object-cover" alt={firstLetter} src={image} />
          </div>
          <div className="flex-1 p-4">
            <div className="uppercase tracking-wide font-semibold text-violet-600 hover:text-blue-600">
              {name}
            </div>
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
            <div className="uppercase tracking-wide font-semibold text-violet-600 hover:text-blue-600">
              {name}
            </div>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-200">
              {description}
            </p>
          </div>
        </div>
      )}
      <div className="ml-auto">
        { showProductItem ? (
          <div className="flex ml-auto">
            <button 
              className="mt-2 mr-2 bg-violet-500 text-white px-3 py-1 text-sm"
              onClick={handleEditProduct}>
              Edit
            </button>
            <button
              onClick={deleteProduct} 
              className="mt-2 mr-2 bg-violet-500 text-white px-3 py-1 text-sm">
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