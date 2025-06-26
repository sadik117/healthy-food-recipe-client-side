import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ErrorPage from "../components/pages/ErrorPage";
import Home from "../components/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import ForgotPass from "../components/pages/ForgotPass";
import AllRecipes from "../components/AllRecipes";
import AddRecipes from "../components/Firebase/AuthProvider/PrivateRoutes/AddRecipes";
import MyRecipes from "../components/Firebase/AuthProvider/PrivateRoutes/MyRecipes";
import RecipeDetails from "../components/pages/RecipeDetails";
import PrivateRoute from "../components/Firebase/AuthProvider/PrivateRoutes/PrivateRoute";
// import DashboardHome from "../components/layouts/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Home />
        ),
      },
      {
        path: "all-recipes",
        element: <AllRecipes />,
      },
      {
        path: "viewDetails/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgetpassword",
            element: <ForgotPass />,
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // {
          //   index: true,
          //   Component: DashboardHome
          // },
          {
            path: "add-recipe",
            element: <AddRecipes />,
          },
          {
            path: "my-recipes",
            element: <MyRecipes />,
          },
        ],
      },
    ],
  },
]);
