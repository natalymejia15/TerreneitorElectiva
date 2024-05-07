import React, { useState } from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../context";
import { useForm } from "../../hooks";

const initForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, password, onInputChange } = useForm(initForm);
  const [showModal, setShowModal] = useState(false);

  const onLogin = async () => {
    const isValidLogin = await login(email, password);
    if (!isValidLogin) {
      setShowModal(true);
    } else {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };


  return (
    <>
    <div className="flex justify-end items-start h-screen bg-gray-100 p-0">
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
                  required
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
                  type="button"
                  onClick={onLogin}
                  className="mr-2 bg-violet-900 hover:bg-gray-500 text-white rounded-md p-10 py-2 text-sm font-medium"
                >
                  Login
                </button>

                <NavLink
                  to="/"
                  className="mr-2 bg-violet-900 hover:bg-gray-500 text-white rounded-md p-10 py-2 text-sm font-medium"
                >
                  Exit
                </NavLink>
                <NavLink
                  to="/Register"
                  className="mr-2 bg-violet-900 hover:bg-gray-500 text-white rounded-md p-10 py-2 text-sm font-medium"
                >
                  Register
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-end items-center">
              <div className="bg-white p-8 rounded shadow-lg">
                <p className="text-blakc-700">Incorrect credentials. Please try again</p>
                <button onClick={() => setShowModal(false)} className="mt-4 bg-violet-900 hover:bg-gray-500 text-white rounded-md py-2 px-4 text-sm font-medium">
                  Close
                </button>
              </div>
            </div>
          )}
    </>
  );
};
