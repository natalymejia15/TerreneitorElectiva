import React from 'react'
import UpvoteButton from "../components/UpvoteButton";

export const ProductItem = ({
  name,
  description,
  rate,
  image,
  userId,
  upvotes = "0",
  isUpvoted = false,
  id,
  displayName,
}) => {

  const [upvoted, setUpvoted] = React.useState(isUpvoted);
  const firstLetter = name.charAt(0).toUpperCase();   

  const handleUpvote = () => {

/*   useEffect(() => {
    const getList = async () => {
      try {
        const orderByField = 'userId'; 
        const queryProduct = query(collection(FirebaseDB, 'products'), orderBy(orderByField));
        const querySnapshot = await getDocs(queryProduct);
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data().post, id: doc.id });
            });
        setProducts(docs);
        console.log(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, []); */

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