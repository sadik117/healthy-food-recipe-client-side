import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Helmet } from "react-helmet-async";


const MySwal = withReactContent(Swal);

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://recipe-book-server-side.vercel.app/my-recipes?email=${user.email}`)
        .then(res => res.json())
        .then(data => setMyRecipes(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const res = await fetch(`https://recipe-book-server-side.vercel.app/recipes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Recipe deleted successfully.");
        setMyRecipes(prev => prev.filter(recipe => recipe._id !== id));
        MySwal.fire('Deleted!', 'Your recipe has been removed.', 'success');
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
      categories: form.categories.value.split(",").map(c => c.trim()),
    };

    const res = await fetch(`https://recipe-book-server-side.vercel.app/recipes/${editingRecipe._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRecipe)
    });

    if (res.ok) {
      const updated = await res.json();
      setMyRecipes(prev => prev.map(r => r._id === updated._id ? updated : r));
      setShowModal(false);
      setEditingRecipe(null);

      MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Your recipe has been updated successfully.'
      });
    } else {
      toast.error("Failed to update recipe.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <Helmet>
        <title>My Recipes</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">My Recipes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-800 dark:text-gray-100">
        {myRecipes.map(recipe => (
          <div key={recipe._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold dark:text-white">{recipe.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Cuisine: {recipe.cuisine}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Prep Time: {recipe.prepTime} mins</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Likes: ❤️ {recipe.likeCount}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingRecipe(recipe);
                    setShowModal(true);
                  }}
                  className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Update Modal */}
      {showModal && editingRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Recipe</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={editingRecipe.title}
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <textarea
                name="ingredients"
                defaultValue={editingRecipe.ingredients}
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <textarea
                name="instructions"
                defaultValue={editingRecipe.instructions}
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="text"
                name="cuisine"
                defaultValue={editingRecipe.cuisine}
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="number"
                name="prepTime"
                defaultValue={editingRecipe.prepTime}
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="text"
                name="categories"
                defaultValue={editingRecipe.categories.join(", ")}
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white btn-sm">
                  Update
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline btn-sm dark:border-gray-400">
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

export default MyRecipes;
