import React from 'react'
import UpvoteButton from "../components/UpvoteButton";

export const ProductItemLogin = ({
  name,
  description,
  rate,
  image,
  upvotes = "0",
  isUpvoted = false,
  _id,
}) => {

  const [upvoted, setUpvoted] = React.useState(isUpvoted);
  const firstLetter = name.charAt(0).toUpperCase();
  /*   const tagNames = tags.map((tag) => {
      return tag.label;
    }); */

  const handleUpvote = () => {

    /*   setUpvoted(!upvoted);
        fetch(https://product-hunt-18dcc2.can.canonic.dev/api/upvotes, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: {
              product: _id,
            },
          }),
        })
          .then((res) => res.json())
          .then((json) => json?.data);*/

  };

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
        <UpvoteButton
          upvoted={upvoted}
          variant="outlined"
          disableRipple={true}
          onclick={handleUpvote}
        >
          {upvotes}
        </UpvoteButton>
      </div>
    </div>


  );
};