import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    fetch("https://recipe-book-server-side.vercel.app/all-recipes") 
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data);
        const cuisines = Array.from(new Set(data.map(recipe => recipe.cuisine)));
        setCuisineTypes(cuisines);
      });
  }, []);

  useEffect(() => {
    if (selectedCuisine) {
      setFilteredRecipes(recipes.filter(r => r.cuisine === selectedCuisine));
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCuisine, recipes]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
  
     <Helmet>
      <title>All Recipes</title>
     </Helmet>

      <h2 className="text-4xl font-bold mb-6 text-center dark:text-gray-300">All Recipes</h2>
    <div className=" text-gray-900 dark:text-gray-100">
      {/* Cuisine Filter */}
      <div className="flex justify-end mb-6">
        <select
          onChange={(e) => setSelectedCuisine(e.target.value)}
          value={selectedCuisine}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All Cuisines</option>
          {cuisineTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredRecipes.map(recipe => (
          <div key={recipe._id} className="card bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
              <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
              <p><strong>Prep Time:</strong> {recipe.prepTime} min</p>
              <p><strong>Likes:</strong> ❤️ {recipe.likeCount}</p>
              <Link
                to={`/viewDetails/${recipe._id}`}
                className="btn btn-sm bg-sky-600 text-emerald-100 w-full mt-3"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllRecipes;
