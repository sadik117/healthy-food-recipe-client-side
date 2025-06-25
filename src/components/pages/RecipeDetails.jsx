import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Firebase/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://recipe-book-server-side.vercel.app/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      });
  }, [id]);

  const handleLike = async () => {
    if (user?.email === recipe.userEmail) {
      toast.warning("You can't like your own recipe.");
      return;
    }

    const res = await fetch(`https://recipe-book-server-side.vercel.app/recipes/${id}/like`, {
      method: "PATCH"
    });

    if (res.ok) {
      setRecipe(prev => ({ ...prev, likeCount: prev.likeCount + 1 }));
    } else {
      toast.error("Failed to like the recipe.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-20">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 my-6 bg-amber-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      
     <Helmet>
      <title>Recipe Details</title>
     </Helmet>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-60 object-cover rounded"
      />

      <h2 className="text-3xl font-bold mt-4 mb-2 dark:text-gray-100">{recipe.title}</h2>
      
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-400">
        <strong>Added by:</strong> {recipe.userName}
      </p>

      <p className="mb-1 text-gray-800 dark:text-gray-300">
        <strong>Cuisine:</strong> {recipe.cuisine}
      </p>

      <p className="mb-1 text-gray-800 dark:text-gray-300">
        <strong>Preparation Time:</strong> {recipe.prepTime} minutes
      </p>

      <p className="mb-1 text-gray-800 dark:text-gray-300">
        <strong>Categories:</strong> {recipe.categories?.join(", ")}
      </p>

      <p className="mb-4 text-gray-800 dark:text-gray-300">
        <strong>Ingredients:</strong><br />
        {recipe.ingredients}
      </p>

      <p className="mb-4 text-gray-800 dark:text-gray-300">
        <strong>Instructions:</strong><br />
        {recipe.instructions}
      </p>

      <p className="text-lg font-semibold dark:text-gray-200">
        ❤️ {recipe.likeCount} people interested
      </p>

      <button
        onClick={handleLike}
        className="mt-4 btn btn-primary"
      >
        Like ❤️
      </button>
    </div>
  );
};

export default RecipeDetails;
