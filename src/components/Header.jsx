import { useState } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_AVATAR } from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store?.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
        console.log(error);
      });
  };

  return (
    <>
      <nav className="bg-gray-100 border border-black">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 border border-red-500">
          <div className="relative flex h-16 items-center justify-between border border-green-500">
            {/* mobile view */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden border border-purple-900">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-[#4242f3] border border-gray-400  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMenu}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
              <div className="flex flex-shrink-0 items-center border b">
                <h1 className="text-2xl lg:text-4xl text-[#4242f3]">
                  GoalCast
                </h1>
              </div>
              <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                <div className="flex flex-col space-y-4 border border-black w-auto mt-72">
                  <a
                    href="#"
                    className=" text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className=" text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className=" text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                  >
                    Calendar
                  </a>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block lg:ml-60">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className=" text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className=" text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className=" text-black font-semibold  rounded-md px-3 py-2 text-lg  hover:text-white hover:bg-[#4242f3]"
                  >
                    Calendar
                  </a>
                </div>
              </div>
            </div>
            <div className="border border-blackabsolute gap-x-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className=" p-2 relative rounded-full bg-[#4242f3] font-semibold text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className=" p-2 relative rounded-full bg-[#4242f3] font-semibold text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Log Out
              </button>
              <h1>{user?.displayName}</h1>
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={USER_AVATAR}
                      alt="image"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
