import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import ErrorPage from "../components/pages/ErrorPage";
import Home from "../components/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import AllRecipes from "../components/AllRecipes";
import AddRecipes from "../components/Firebase/AuthProvider/PrivateRoutes/AddRecipes";
import MyRecipes from "../components/Firebase/AuthProvider/PrivateRoutes/MyRecipes";
import PrivateRoute from "../components/Firebase/AuthProvider/PrivateRoutes/PrivateRoute";
import RecipeDetails from "../components/pages/RecipeDetails";
import ForgotPass from "../components/pages/ForgotPass";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
        hydrateFallbackElement: (
          <p className="justify-center items-center mx-120 my-50">
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
          </p>
        ),
      },
      {
        path: "/all-recipes",
        Component: AllRecipes,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipes></AddRecipes>
          </PrivateRoute>
        ),
      },
      {
        path: "/viewDetails/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes></MyRecipes>
          </PrivateRoute>
        ),
      },
      {
        path: "/auth",
        children: [
          {
            path: "/auth/login",
            Component: Login,
          },
          {
            path: "/auth/register",
            Component: Register,
          },
          {
            path: "/auth/forgetpassword",
            Component: ForgotPass 
          },
        ],
      },
    ],
  },
]);
