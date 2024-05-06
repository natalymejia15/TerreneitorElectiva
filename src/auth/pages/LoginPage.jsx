import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context";
import { useForm } from "../../hooks";

const initForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { login, errorMessage } = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, password, onInputChange } = useForm(initForm);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setShowModal(true);
      return;
    }

    const isValidLogin = await login(email, password);

    if (isValidLogin) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="max-w-md w-full">
          <div className="bg-slate-300 rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl mb-4 font-semibold text-center">My Account</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  placeholder="Enter your Email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-violet-900 hover:bg-gray-400 text-white rounded-md p-10 py-2 text-sm font-medium"
                  onClick={handleLogin}
                >
                  Login
                  
                </button>
                <button
                  className="bg-violet-900 hover:bg-gray-400 text-white rounded-md p-10 py-2 text-sm font-medium"
                  onClick={handleExit}
                >
                  Exit
                </button>
                <button
                  className="bg-violet-900 hover:bg-gray-400 text-white rounded-md p-10 py-2 text-sm font-medium"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
              {errorMessage && (
                <div className="mt-4 p-6 bg-red-100 text-red-700 rounded border border-red-400">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl mb-4 font-semibold text-center">Incorrect credentials. Please try again</h1>
            <p className="text-red-700">{errorMessage}</p>
            <button
              className="bg-violet-900 hover:bg-gray-400 text-white rounded-md p-10 py-2 text-sm font-medium"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
