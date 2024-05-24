import { useContext, useState } from "react";
import { AuthContext } from "../context";
import { useForm } from "../../hooks";
import logo from "../../image/logo.png";
import { useNavigate } from "react-router-dom";

const unitForm = {
  email: "",
  password: "",
  displayName: "",
};

export const Register = () => {
  const { register, errorMessage } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Estado para controlar si la modal de error está abierta

  const { email, password, displayName, onInputChange } = useForm(unitForm);

  const onRegister = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!displayName) {
      setRegisterError("Username is required");
      hasError = true;
    } else {
      setRegisterError("");
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      return;
    }

    const isValidRegister = await register(email, password, displayName);
    if (isValidRegister) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={logo}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Registeer</h1>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-violet-500"
            value={displayName}
            onChange={onInputChange}
          />
          {registerError && <p className="text-red-500">{registerError}</p>}
        </div>
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
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
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
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <button
          type="submit"
          onClick={onRegister}
          className="bg-violet-900 hover:bg-violet-700 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          Register
        </button>
        <div className="mt-6 text-violet-500 text-center">
          <a href="/" className="hover:underline">
            Go back!
          </a>
        </div>
        <br />
        {errorMessage && (
          <div
            className={`fixed z-10 inset-0 overflow-y-auto ${
              isErrorModalOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex items-center justify-center min-h-screen">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="relative bg-white p-8 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blcak-700">
                    Error
                  </h2>
                  <button
                    className="mt-4 bg-violet-900 hover:bg-gray-500 text-white rounded-md py-2 px-4 text-sm font-medium"
                    onClick={closeErrorModal}
                  >
                    Close
                  </button>
                </div>
                <div className=" text-blck rounded-md py-2 px-4 text-sm font-medium">
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
