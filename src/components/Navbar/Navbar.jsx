import { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import Lottie from "lottie-react";
import cookingAnimation from "../../components/Animations/cooking.json";
import { AuthContext } from "../Firebase/AuthProvider/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => logOut();
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navLinks = (
    <>
      <NavLink to="/" className="hover:text-blue-500 dark:hover:text-blue-300">Home</NavLink>
      <NavLink to="/all-recipes" className="hover:text-blue-500 dark:hover:text-blue-300">All Recipes</NavLink>
      {user && (
        <NavLink to="/dashboard" className="hover:text-blue-500 dark:hover:text-blue-300">Dashboard</NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-sky-200 dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-screen mx-2 md:mx-4 px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-13 h-10">
            <Lottie animationData={cookingAnimation} loop={true} className="mt-1.5" />
          </div>
          <span className="text-xl font-bold text-amber-600 dark:text-amber-400">Recipe Book</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-gray-700 dark:text-gray-300 font-medium text-sm">
          {navLinks}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="ml-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? (
              <FiSun size={20} className="text-yellow-400" />
            ) : (
              <FiMoon size={20} />
            )}
          </button>

          {!user ? (
            <>
              <NavLink to="/auth/login" className="hover:text-blue-500 dark:hover:text-blue-300">Login</NavLink>
              <NavLink to="/auth/register" className="hover:text-blue-500 dark:hover:text-blue-300">Register</NavLink>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full border cursor-pointer"
              />
              <div className="absolute z-50 right-2 mt-0.5 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 hidden group-hover:block">
                <p className="text-sm text-gray-800 dark:text-gray-200">{user.displayName}</p>
                <button
                  onClick={handleLogout}
                  className="text-red-600 mt-2 hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? (
              <FiSun size={20} className="text-yellow-400" />
            ) : (
              <FiMoon size={20} />
            )}
          </button>

          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
          {navLinks}
          {!user ? (
            <>
              <NavLink to="/auth/login" className="hover:text-blue-500 dark:hover:text-blue-300">Login</NavLink>
              <NavLink to="/auth/register" className="hover:text-blue-500 dark:hover:text-blue-300">Register</NavLink>
            </>
          ) : (
            <>
              <p>{user.displayName}</p>
              <button onClick={handleLogout} className="text-red-600 hover:underline">
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
