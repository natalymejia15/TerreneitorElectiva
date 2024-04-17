import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth";
import myIcon from "../../image/icono.png";
import logo from "../../image/logosmall.png";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className=" justify-between bg-violet-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <img className="h-10 w-auto" src={logo} alt="logo" />
            </div>
            <div className="hidden sm:ml-4 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/HomeProduct"
                  className="bg-violet-900 text-white rounded-md p-10 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Home Product
                </NavLink>

                <NavLink
                  to="/NewProduct"
                  className="text-gray-100 hover:bg-violet-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  New Product
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-violet-900 p-1 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <img className="h-6 w-6 object-cover" src={myIcon} alt="Avatar" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!isLoading && (
              <button
                onClick={() => onLogout()}
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-violet-700 focus:outline-none focus:text-white focus:bg-gray-100"
              >
                Sing off
              </button>
            )}
            {isLoading && (
              <button
                onClick={() => onLogout()}
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-violet-700 focus:outline-none focus:text-white focus:bg-gray-100"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
