import { useState, useEffect, useContext } from "react";
import { ProductContext } from "~products/context";
import { useForm } from "~hooks/useForm";
import { AuthContext } from "~auth/context";
import { FirebaseDB } from "~firebase/config";
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
  createdAt: "",
  updatedAt: "",
};

export const Comments = ({ productId }) => {
  const { saveComment } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [currentDate] = useState(new Date());
  const [comments, setComments] = useState([]);

  const { comment, rate, onInputChange, resetForm } = useForm(initialComment);

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Fecha inválida";
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
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
          docs.push({ ...doc.data(), id: doc.id });
        });
        setComments(docs);
        console.log(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  const onCreateNewComment = async (event) => {
    event.preventDefault();

    const newCommentUser = {
      productId,
      comment,
      rate,
      userId: user.uid,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await saveComment(newCommentUser);
    const updatedComments = await getComments(productId);
    setComments(updatedComments);
    resetForm();
  };

  return (
    <div className="mt-4">
      <div className="mt-4">
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={onInputChange}
          placeholder="Escribe tu comentario aquí..."
          className="w-full p-2 border rounded-md"
        />
        <select
          id="rate"
          name="rate"
          value={rate}
          onChange={onInputChange}
          className="mt-2 w-full p-2 border rounded-md"
        >
          <option value="" disabled>
            Selecciona una valoración
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
          onClick={onCreateNewComment}
          className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md"
        >
          Agregar Comentario
        </button>
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-gray-700">Comentarios</h4>
        <div className="mt-2 border-b border-gray-200 pb-2">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b py-2">
              <p className="text-gray-700">{comment.comment}</p>
              <p className="text-gray-500">Valoración: {comment.rate}</p>
              <p className="text-sm text-gray-600">
                Fecha:{" "}
                {formatDate(
                  new Date(
                    comment.createdAt.seconds * 1000 +
                      comment.createdAt.nanoseconds / 1000000
                  )
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
