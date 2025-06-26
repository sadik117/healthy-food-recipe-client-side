import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopRecipes = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    fetch("https://recipe-book-server-side.vercel.app/top-recipes")
      .then(res => res.json())
      .then(data => setTopRecipes(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
     <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">Top Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  text-gray-800 dark:text-gray-100">
        {topRecipes.map(recipe => (
          <div key={recipe._id} className="card bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 dark:text-white">{recipe.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">Cuisine: {recipe.cuisine}</p>
              <p className="text-gray-600 dark:text-gray-300">Likes: ❤️ {recipe.likeCount}</p>
              <Link to={`/viewDetails/${recipe._id}`} className="btn bg-sky-600 text-emerald-100 mt-4 w-full">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/all-recipes" className="btn btn-outline btn-accent">
          See All Recipes
        </Link>
      </div>
    </div>
  );
};

export default TopRecipes;
