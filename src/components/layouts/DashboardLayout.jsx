import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">

      {/* Sticky Top Bar for Mobile */}
      {!isDrawerOpen && (
        <div className="md:hidden sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 p-2 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>
          <button
            onClick={toggleDrawer}
            className="p-2 bg-white dark:bg-gray-800 border rounded shadow-md"
            aria-label="Open sidebar"
          >
            <FiMenu size={20} className="text-gray-800 dark:text-gray-200" />
          </button>
        </div>
      )}

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          onClick={closeDrawer}
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-md p-4 z-40 transform transition-transform duration-300 ease-in-out
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close button inside drawer (mobile only) */}
        <div className="md:hidden flex justify-end mb-2">
          <button
            onClick={closeDrawer}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <FiX size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Dashboard</h2>
        <nav className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
          <NavLink
            to="/dashboard/my-recipes"
            className={({ isActive }) =>
              `hover:text-blue-500 dark:hover:text-blue-300 ${
                isActive ? "font-semibold text-blue-600 dark:text-blue-300" : ""
              }`
            }
            onClick={closeDrawer}
          >
            My Recipes
          </NavLink>
          <NavLink
            to="/dashboard/add-recipe"
            className={({ isActive }) =>
              `hover:text-blue-500 dark:hover:text-blue-300 ${
                isActive ? "font-semibold text-blue-600 dark:text-blue-300" : ""
              }`
            }
            onClick={closeDrawer}
          >
            Add Recipe
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="text-gray-800 dark:text-gray-200 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
