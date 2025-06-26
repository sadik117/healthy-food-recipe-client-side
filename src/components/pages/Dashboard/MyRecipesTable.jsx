import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Firebase/AuthProvider/AuthProvider";
import Loading from "../Loading";

const MySwal = withReactContent(Swal);

const MyRecipesTable = () => {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://recipe-book-server-side.vercel.app/my-recipes?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyRecipes(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`https://recipe-book-server-side.vercel.app/recipes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Recipe deleted successfully.");
        setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
        MySwal.fire("Deleted!", "Your recipe has been removed.", "success");
      } else {
        toast.error("Failed to delete recipe.");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedRecipe = {
      title: form.title.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      cuisine: form.cuisine.value,
      prepTime: parseInt(form.prepTime.value),
      categories: form.categories.value.split(",").map((c) => c.trim()),
    };

    const res = await fetch(
      `https://recipe-book-server-side.vercel.app/recipes/${editingRecipe._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      }
    );

    if (res.ok) {
      const updated = await res.json();
      setMyRecipes((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
      setShowModal(false);
      setEditingRecipe(null);
      MySwal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your recipe has been updated successfully.",
      });
    } else {
      toast.error("Failed to update recipe.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 text-gray-800 dark:text-gray-100">
      <Helmet>
        <title>Dashboard || My Recipes</title>
      </Helmet>

      <div className="overflow-x-auto shadow rounded-lg border dark:border-gray-700">
        <table className="table w-full text-sm">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Cuisine</th>
              <th>Prep Time</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myRecipes.map((recipe) => (
              <tr key={recipe._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td>
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingRecipe(recipe);
                        setShowModal(true);
                      }}
                      className="btn btn-xs bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {myRecipes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <Loading></Loading>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showModal && editingRecipe && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl w-full max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4">Update Recipe</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={editingRecipe.title}
                placeholder="Recipe title"
                className="input input-bordered w-full dark:bg-gray-700"
                required
              />
              <textarea
                name="ingredients"
                defaultValue={editingRecipe.ingredients}
                placeholder="Ingredients"
                className="textarea textarea-bordered w-full dark:bg-gray-700"
                required
              />
              <textarea
                name="instructions"
                defaultValue={editingRecipe.instructions}
                placeholder="Instructions"
                className="textarea textarea-bordered w-full dark:bg-gray-700"
                required
              />
              <input
                type="text"
                name="cuisine"
                defaultValue={editingRecipe.cuisine}
                placeholder="Cuisine"
                className="input input-bordered w-full dark:bg-gray-700"
                required
              />
              <input
                type="number"
                name="prepTime"
                defaultValue={editingRecipe.prepTime}
                placeholder="Preparation time"
                className="input input-bordered w-full dark:bg-gray-700"
                required
              />
              <input
                type="text"
                name="categories"
                defaultValue={editingRecipe.categories.join(", ")}
                placeholder="Categories (comma-separated)"
                className="input input-bordered w-full dark:bg-gray-700"
                required
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="submit"
                  className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-outline dark:border-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipesTable;
