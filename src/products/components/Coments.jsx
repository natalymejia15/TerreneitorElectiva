import { useState, useEffect, useContext } from "react";
import { AuthContext } from "~auth/context";

const newComment = {
  comment: "",
  userId:"",
  createdAt: "",
  updatedAt: "",
};

export const Coments = ({ comments = [] }) => {

  const [commentList, setCommentList] = useState(comments);
  const { user } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [Iduser, setUserId] = useState(user.uid);

  const { comment, userId, createdAt, updatedAt } = useForm(newComment);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: commentList.length + 1,
        text: newComment,
        author: user.displayName || "Anonymous", // Utiliza el nombre del usuario si está disponible
        userId: user.uid || null, // Guarda el ID del usuario si está autenticado
      };
      setCommentList([...commentList, newCommentObj]);
    }
  };

  const onCreateNewComent = async (event) => {
    event.preventDefault();

    const ComentNew = {
      comment: comment,
      userId: Iduser,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await saveComent(ComentNew);
    navigate("/HomeProduct");
  };

  return (
    <div className="mt-4">
      <h4 className="font-bold text-gray-700">Comentarios</h4>
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <div key={comment.id} className="mt-2 border-b border-gray-200 pb-2">
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-gray-500 text-sm italic">
              {comment.author} ({comment.userId})
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}
      {!isLoading && (
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={handleNewCommentChange}
            placeholder="Escribe tu comentario aquí..."
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={onCreateNewComent
            }
            className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md"
          >
            Agregar Comentario
          </button>
        </div>
      )}
    </div>
  );
};
