import React from 'react'
import { HiArrowCircleDown } from "react-icons/hi";
import UpvoteButton from "../components/UpvoteButton";

export const ProductItem = ({
  name,
  description,
  tags,
  brandImage,
  upvotes = "0",
  isUpvoted = false,
  _id,
}) => {

  const [upvoted, setUpvoted] = React.useState(isUpvoted);

  const tagNames = tags.map((tag) => {
    return tag.label;
  });

  const handleUpvote = () => {
    setUpvoted(!upvoted);
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
      .then((json) => json?.data);
  };

  return (
    <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="Avatar">
        <div className="w-24 rounded-full" style={{ width: 80, height: 80, backgroundColor: '#4b587c', marginRight: 2 }}>
          <img alt={name} src={brandImage.url ?? "notPresent"} />
        </div>
      </div>
      <div className="flex-col">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {name}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {description}
        </p>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {tagNames.join(" ・ ")}
        </p>
      </div>
      <div>
        <UpvoteButton
          upvoted={upvoted}
          variant="outlined"
          disableRipple={true}
          onclick={handleUpvote}
          startIcon={<HiArrowCircleDown />}
        >
          {upvotes}
        </UpvoteButton>
      </div>
    </div>
  );

};
