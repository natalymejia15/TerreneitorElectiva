import { useState, useEffect, useContext } from "react";
import { ProductContext } from "~products/context";
import { useForm } from "~hooks/useForm";
import { Link } from 'react-router-dom';
import icono from "../../image/icono.png";
import { AuthContext } from "~auth/context";
import { FirebaseDB } from "~firebase/config";
import { GetProduct } from "./GetProduct";
import {
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore/lite";

const initialComment = {
  productId: "",
  comment: "",
  rate: "",
  userId: "",
  userName: "",
  createdAt: "",
  updatedAt: "",
};

export const Comments = ({ productId }) => {
  const { saveComment } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [currentDate] = useState(new Date());
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [rateError, setRateError] = useState("");

  const { comment, rate, onInputChange, resetForm } = useForm(initialComment);
  let totalRate = 0;
  let CantRate=0;
  
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Fecha inválida";
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getComments = async () => {
    try {
      const orderByField = "productId";
      const queryProduct = query(
        collection(FirebaseDB, "comments"),
        where("productId", "==", productId),
        orderBy(orderByField)
      );

      const querySnapshot = await getDocs(queryProduct);
      const docs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const rate = data.rate;
        totalRate += rate;
        docs.push({ ...doc.data(), id: doc.id });
      });
      CantRate = docs.length;
      setComments(docs);
      return docs;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const onCreateNewComment = async (event) => {
    event.preventDefault();
    let hasError = false;
    const average = (totalRate+rate)/(CantRate+1)

    if (!comment) {
      setCommentError("Comment is required");
      hasError = true;
    } else {
      setCommentError("");
    }

    if (!rate) {
      setRateError("Rate is required");
      hasError = true;
    } else {
      setRateError("");
    }

    if (hasError) {
      return;
    }

    const newCommentUser = {
      productId,
      comment,
      userName: user.displayName,
      rate,
      userId: user.uid,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await updateProductRate(productId,average);
    await saveComment(newCommentUser);
    const updatedComments = await getComments();
    setComments(updatedComments);
    resetForm();
  };

  return (
    <div className="mt-4">
      <div className="mt-8">
        <div className="mt-4 border-b border-gray-300 pb-3">
          <h4 className="font-bold text-gray-700">New comment</h4>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={onInputChange}
            placeholder="Write your comment here..."
            className="w-full p-2 border rounded-md"
          />
          {commentError && <p className="text-red-500">{commentError}</p>}
  
          <select
            id="rate"
            name="rate"
            value={rate}
            onChange={onInputChange}
            className="mt-2 w-full p-2 border rounded-md"
          >
            <option value="" disabled>
              Select a rating
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {rateError && <p className="text-red-500">{rateError}</p>}
  
          <button
            onClick={onCreateNewComment}
            className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md"
          >
            Add comment
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="font-bold text-gray-700">Other comments</h4>
        <div className="mt-4 border-b border-gray-300 pb-3">
          <div className="mt-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex p-4 bg-white rounded-2xl shadow-lg mb-4"
              >
                <div className="w-16 mr-4">
                  <img
                    src={icono}
                    alt="icono"
                    className="rounded-full w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">
                    <Link to={`/users/${comment.userId}`} className="text-blue-500">
                      {comment.userName}
                    </Link>
                  </div>
                  <div className="mb-2">{comment.comment}</div>
                  <div className="mb-2">Rate: {comment.rate}</div>
                  <div className="text-gray-500">
                    Date:{" "}
                    {formatDate(
                      new Date(
                        comment.createdAt.seconds * 1000 +
                        comment.createdAt.nanoseconds / 1000000
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
