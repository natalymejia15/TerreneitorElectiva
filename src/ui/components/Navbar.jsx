import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AuthContext } from "../../auth";
import { BellIcon } from "@heroicons/react/24/outline";
import myIcon from "../../image/icono.png";
import logo from "../../image/logosmall.png";
import { CategoriesDropdown } from "~products/components/CategoriesDropdown";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  const categories = [
    { name: "Artificial Intelligence", href:"/products/:"},
    { name: "Business Software", href:"/products/:software"},
    { name: "Hardware",href:"/products/&{name}" },
    { name: "Mobile technology", href:"/products/:mobil" },
    { name: "Technological Architecture", href:"/products/&{name}" },
    { name: "Business Intelligence", href:"/products/&{name}"},
  ];

  const menu = () => {
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button
          type="button"
          className="relative rounded-full bg-violet-900 p-1 text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              {
                user.photoURL ? (
                  <img className="h-8 w-8 rounded-full" src={user.photoURL} alt="Avatar" />
                ):(
                  <img className="h-8 w-8 rounded-full" src={myIcon} alt="Avatar" />
                )
              }
             
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <a
                  href="/Profile"
                  className="bg-gray-100  block px-4 py-2 text-sm text-gray-700"
                >
                  Your Profile
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  href="/MyProducts"
                  className="bg-gray-100  block px-4 py-2 text-sm text-gray-700"
                >
                  My products
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => onLogout()}
                  className="bg-gray-200  block px-4 py-2 text-sm text-gray-500"
                >
                  Log out
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  return (
    <nav className="bg-violet-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-10 w-auto" src={logo} alt="logo" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    to="/"
                    className="bg-violet-900 text-white rounded-md p-10 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Home Product
                    
                  </NavLink>
                
                </div>
              </div>
            </div>
            <div className="px-4 ">
              <CategoriesDropdown categories={categories} />
            </div>
            
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              menu()
            ) : (
              <NavLink
                to="/login"
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-violet-700 focus:outline-none focus:text-white focus:bg-gray-100"
              >
                Log in
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
