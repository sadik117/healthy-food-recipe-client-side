import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";
import { Helmet } from "react-helmet-async";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newRecipe = {
      title: form.title.value,
      image: form.image.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      cuisine: form.cuisine.value,
      prepTime: parseInt(form.prepTime.value),
      categories: Array.from(
        form.querySelectorAll('input[name="category"]:checked')
      ).map((input) => input.value),
      likeCount: 0,
      userEmail: user?.email || "anonymous",
      userName: user?.displayName || "Unknown",
    };

    try {
      const res = await fetch("https://recipe-book-server-side.vercel.app/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Recipe added successfully!");
        form.reset();
        navigate("/all-recipes");
      } else {
        toast.error("Failed to add recipe.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-amber-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-xl mt-10">
      
      <Helmet>
        <title>Add Recipe</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h2>
      <form onSubmit={handleAddRecipe} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-semibold mb-1">Ingredients</label>
          <textarea
            name="ingredients"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          ></textarea>
        </div>

        {/* Instructions */}
        <div>
          <label className="block font-semibold mb-1">Instructions</label>
          <textarea
            name="instructions"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          ></textarea>
        </div>

        {/* Cuisine */}
        <div>
          <label className="block font-semibold mb-1">Cuisine Type</label>
          <select
            name="cuisine"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Prep Time */}
        <div>
          <label className="block font-semibold mb-1">Preparation Time (minutes)</label>
          <input
            type="number"
            name="prepTime"
            min="1"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block font-semibold mb-1">Categories</label>
          <div className="flex flex-wrap gap-4">
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 dark:text-gray-200">
                <input type="checkbox" name="category" value={cat} className="checkbox checkbox-sm" />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div>
          <input
            type="submit"
            value="Add Recipe"
            className="btn btn-primary w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
