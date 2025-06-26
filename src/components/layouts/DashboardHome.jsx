// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../Firebase/AuthProvider/AuthProvider";

// const DashboardHome = () => {
//   const { user } = useContext(AuthContext);
//   const [totalRecipes, setTotalRecipes] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [myRecipes, setMyRecipes] = useState(0);
//   const [myReviews, setMyReviews] = useState(0);

//   useEffect(() => {
//     // Fetch total recipes
//     fetch("https://your-api.com/recipes/count")
//       .then(res => res.json())
//       .then(data => setTotalRecipes(data.count));

//     // Fetch total users
//     fetch("https://your-api.com/users/count")
//       .then(res => res.json())
//       .then(data => setTotalUsers(data.count));

//     // Fetch user's recipes
//     if (user?.email) {
//       fetch(`https://your-api.com/recipes?email=${user.email}`)
//         .then(res => res.json())
//         .then(data => setMyRecipes(data.length));

//       // Fetch user's reviews
//       fetch(`https://your-api.com/reviews?email=${user.email}`)
//         .then(res => res.json())
//         .then(data => setMyReviews(data.length));
//     }
//   }, [user]);

//   const cardStyle =
//     "bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center";

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//       <div className={cardStyle}>
//         <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalRecipes}</p>
//         <p className="text-gray-700 dark:text-gray-200 mt-2">Total Recipes</p>
//       </div>
//       <div className={cardStyle}>
//         <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalUsers}</p>
//         <p className="text-gray-700 dark:text-gray-200 mt-2">Total Users</p>
//       </div>
//       <div className={cardStyle}>
//         <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{myRecipes}</p>
//         <p className="text-gray-700 dark:text-gray-200 mt-2">My Recipes</p>
//       </div>
//       <div className={cardStyle}>
//         <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{myReviews}</p>
//         <p className="text-gray-700 dark:text-gray-200 mt-2">My Reviews</p>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
