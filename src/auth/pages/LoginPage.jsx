import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "Alexander" && password === "12345") {
      login(username);
      navigate("/HomeProduct");
    } else {
      setError("Incorrect credentials. Please try again.");
    }
  };

  const handRegister = () => {
      navigate("/Register");
    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-gray-400 shadow-md rounded px-16 pt-6 pb-12 mb-4">
        <div className="text-center">
          <h1 className="text-3xl mb-4 font-semibold">Product Hunt</h1>
          <hr className="my-4" />
          <label htmlFor="username" className="block text-black-700 text-sm font-bold mb-2">Username</label>
          <input 
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="block text-black-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-white-500 text italic">{error}</p>}
          <div className="mt-6">
            <button
              className="mr-2 bg-violet-900 hover:bg-gray-500 text-white rounded-md p-10 py-2 text-sm font-medium"
              onClick={handRegister}
            >
              Register
            </button>
            <button
              className="mr-2 bg-violet-900 hover:bg-gray-500 text-white rounded-md p-10 py-2 text-sm font-medium"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );     
};

