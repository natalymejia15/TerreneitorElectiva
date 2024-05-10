import React from 'react'
import UpvoteButton from "../components/UpvoteButton";

export const ProductItem = ({
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
    fetch(`https://product-hunt-18dcc2.can.canonic.dev/api/upvotes`, {
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
    <div className="md:flex max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="w-16 rounded-full flex-row bg-violet-900"
        style={{
          width: 60,
          height: 60,
          marginRight: 2,
        }}
      >
        <img className='text-white text-xl flex-col m-4 ' alt={firstLetter} src={image ?? "notPresent"} />
      </div>
      <div className='p-4'>
        <div className="uppercase tracking-wide font-semibold text-violet-900 hover:text-blue-600">
          {name}
        </div>
        <p className="mt-2 text-base text-neutral-600 dark:text-neutral-200">
          {description}
        </p>
        <p className="mb-2 text-base text-neutral-600 dark:text-neutral-200">
          {}
        </p>
      </div>
      <div className='ml-auto'>
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