import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo.png";

import { AuthContext } from "../context";
import { useForm } from "../../hooks";

const initForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { login, loginGoogle } = useContext(AuthContext);
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

  const onGoogleLogin = async (event) => {
    event.preventDefault();

    const isValidLogin = await loginGoogle();

    if (isValidLogin) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={logo}
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-violet-500"
              id="email"
              name="email"
              value={email}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-violet-500"
              id="password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-6 text-violet-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="button"
            onClick={onLogin}
            className="bg-violet-900 hover:bg-violet-700 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
          <div className="mt-6 text-violet-500 text-center">
            <a href="/Register" className="hover:underline">
              Sign up Here
            </a>
          </div>
          <p className="my-8 text-sm text-gray-400 text-center">
            or continue with
          </p>
          <div className="space-x-8 flex justify-center">
            <button type="button" className="border-none outline-none"
              onClick={onGoogleLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                className="inline"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fbbd00"
                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                  data-original="#fbbd00"
                />
                <path
                  fill="#0f9d58"
                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                  data-original="#0f9d58"
                />
                <path
                  fill="#31aa52"
                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                  data-original="#31aa52"
                />
                <path
                  fill="#3c79e6"
                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                  data-original="#3c79e6"
                />
                <path
                  fill="#cf2d48"
                  d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                  data-original="#cf2d48"
                />
                <path
                  fill="#eb4132"
                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                  data-original="#eb4132"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 text-violet-500 text-center">
            <a href="/" className="hover:underline">
              Go back
            </a>
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 rounded shadow-lg">
                <p className="text-black-700">
                  Incorrect credentials. Please try again
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 bg-violet-900 hover:bg-gray-500 text-white rounded-md py-2 px-4 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
