import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { Register } from "./Register";

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
      <div className="bg-gray-600 shadow-md rounded px-16 pt-6 pb-12 mb-4">
        <div className="text-center">
          <h1 className="text-3xl mb-4 font-semibold">Product Home</h1>
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
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
              onClick={handRegister}
            >
              Register
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

