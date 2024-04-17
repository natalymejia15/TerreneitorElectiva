import { useState, useEffect, useMemo } from "react";

export const ProductDetail = ({ image, title, description, comments = [] }) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const [isLoading, setIsLoading] = useState(false);

  const memorizedGames = useMemo(() => setNewComment, []);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: commentList.length + 1,
        text: newComment,
        author: "Anonymous",
      };
      setCommentList([...commentList, newCommentObj]);
      setNewComment("");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const data = await memorizedGames();
      console.log(data.results);
      setNewComment(Array.from(data.results));

      setIsLoading(false);
    };

    fetchData();
  }, [memorizedGames]);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt={title}
          className="w-48 h-48 object-cover rounded-lg"
        />
        <h3 className="text-lg font-bold mt-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-gray-700">Comentarios</h4>
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div
              key={comment.id}
              className="mt-2 border-b border-gray-200 pb-2"
            >
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-gray-500 text-sm italic">{comment.author}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay comentarios aún.</p>
        )}
        {isLoading && (
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={handleNewCommentChange}
              placeholder="Escribe tu comentario aquí..."
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md"
            >
              Agregar Comentario
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
