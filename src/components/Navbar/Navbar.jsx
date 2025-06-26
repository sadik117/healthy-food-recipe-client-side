import { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import Lottie from "lottie-react";
import cookingAnimation from "../../components/Animations/cooking.json";
import { AuthContext } from "../Firebase/AuthProvider/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Handle dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleLogout = () => logOut();

  const navLinkClass = ({ isActive }) =>
    `hover:text-blue-500 dark:hover:text-blue-300 ${
      isActive ? "font-semibold text-blue-600 dark:text-blue-300" : ""
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-sky-200 dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
        >
          <div className="w-10 h-10">
            <Lottie animationData={cookingAnimation} loop={true} />
          </div>
          <span className="text-md font-bold mb-1 text-zinc-800 dark:text-sky-200">
            Recipe Book
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300 font-medium">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/all-recipes" className={navLinkClass}>All Recipes</NavLink>

          {user && (
            <>
              <NavLink to="/add-recipes" className={navLinkClass}>Add Recipes</NavLink>
              <NavLink to="/my-recipes" className={navLinkClass}>My Recipes</NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
            </>
          )}

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? (
              <FiSun size={18} className="text-yellow-400" />
            ) : (
              <FiMoon size={18} />
            )}
          </button>

          {!user ? (
            <>
              <NavLink to="/auth/login" className={navLinkClass}>Login</NavLink>
              <NavLink to="/auth/register" className={navLinkClass}>Register</NavLink>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full border cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-sm rounded-lg shadow-lg p-3 hidden group-hover:block z-50">
                <p className="text-gray-800 dark:text-gray-200">{user.displayName}</p>
                <button onClick={handleLogout} className="text-red-500 mt-2 hover:underline">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <FiSun size={20} className="text-yellow-400" />
            ) : (
              <FiMoon size={20} />
            )}
          </button>
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-gray-700 dark:text-gray-300 font-medium">
          <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/all-recipes" className={navLinkClass} onClick={toggleMenu}>All Recipes</NavLink>

          {user && (
            <>
              <NavLink to="/add-recipes" className={navLinkClass} onClick={toggleMenu}>Add Recipes</NavLink>
              <NavLink to="/my-recipes" className={navLinkClass} onClick={toggleMenu}>My Recipes</NavLink>
              <NavLink to="/dashboard" className={navLinkClass} onClick={toggleMenu}>Dashboard</NavLink>
            </>
          )}

          {!user ? (
            <>
              <NavLink to="/auth/login" className={navLinkClass} onClick={toggleMenu}>Login</NavLink>
              <NavLink to="/auth/register" className={navLinkClass} onClick={toggleMenu}>Register</NavLink>
            </>
          ) : (
            <>
              <p>{user.displayName}</p>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
