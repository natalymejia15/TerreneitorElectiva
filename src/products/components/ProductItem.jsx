import { useState } from 'react';
import React  from 'react'
import { HandleUpvote } from './HandleUpvote';
import { NavLink } from 'react-router-dom';


export const ProductItem = ({
  name,
  description,
  rate,
  image,
  userId,
  isUpvoted = false,
  id,
  displayName,
}) => {

  const [upvoted, setUpvoted] = React.useState(isUpvoted);
  const firstLetter = name.charAt(0).toUpperCase();   
  const [upvotes, setUpvotes] = React.useState(0);

  const handleUpvoteChange = (value) => {
      setUpvotes(value); // Actualizar el estado con el valor de upvote proporcionado por HandleUpvote
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
            <NavLink
              to={`/products/${id}`}
              className="uppercase tracking-wide font-semibold text-violet-600 hover:text-violet-900"
            >
              {name}
            </NavLink>
            </div>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-200">
              {description}
            </p>
            <div>
              {displayName }{rate}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full flex justify-center items-center bg-violet-900">
            <span className="text-white text-3xl">{firstLetter}</span>
          </div>
          <div className="flex-1 p-4">
            <div className="uppercase tracking-wide font-semibold text-violet-600 hover:text-blue-600">
            <a href={url} target="_blank">{name}</a>
            </div>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-200">
              {description}
            </p>
            <div>
              {displayName }{rate}
            </div>            
          </div>
        </div>
      )}
      <div className="bg-violet-500 hover:bg-violet-400 text-gray-300 font-bold mb-12 py-2 px-4 rounded inline-flex items-center">
        <HandleUpvote
          id={userId}
          onUpvoteChange={handleUpvoteChange} 
        />
        {upvotes}
      </div>
    </div>
  );
};