import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const AllRecipesTable = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://recipe-book-server-side.vercel.app/all-recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 text-gray-800 dark:text-gray-100">
      <Helmet>
        <title>Dashboard || All Recipes</title>
      </Helmet>

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="table w-full text-sm">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Cuisine</th>
              <th>Prep Time</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="py-3">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td>{recipe.title}</td>
                <td>{recipe.cuisine}</td>
                <td>{recipe.prepTime} min</td>
                <td>❤️ {recipe.likeCount}</td>
                <td>
                  <Link
                    to={`/viewDetails/${recipe._id}`}
                    className="text-sm px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                  >
                    See Details
                  </Link>
                </td>
              </tr>
            ))}
            {recipes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <Loading></Loading>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecipesTable;
