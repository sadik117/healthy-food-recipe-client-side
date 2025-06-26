import { useEffect, useState, useContext } from "react";
import { BookOpen, LayoutGrid, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Firebase/AuthProvider/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalCuisines, setTotalCuisines] = useState(0);
  const [myRecipes, setMyRecipes] = useState(0);

  useEffect(() => {
    fetch("https://recipe-book-server-side.vercel.app/dashboard/recipes/count")
      .then((res) => res.json())
      .then((data) => setTotalRecipes(data.count));

    fetch("https://recipe-book-server-side.vercel.app/dashboard/recipes/total-cuisines")
      .then((res) => res.json())
      .then((data) => setTotalCuisines(data.totalCuisines));

    if (user?.email) {
      fetch(`https://recipe-book-server-side.vercel.app/dashboard/recipes/user?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyRecipes(data.length));
    }
  }, [user]);

  const cards = [
    {
      title: "Total Recipes",
      count: totalRecipes,
      icon: <BookOpen size={40} className="text-blue-500" />,
      bg: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Total Cuisines",
      count: totalCuisines,
      icon: <LayoutGrid size={40} className="text-green-500" />,
      bg: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "My Recipes",
      count: myRecipes,
      icon: <UserCheck size={40} className="text-orange-500" />,
      bg: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  return (
    <div className="py-8">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-6 rounded-xl bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 shadow-md text-center"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Our Dashboard
          {user?.displayName ? `, ${user.displayName}` : ""}!
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
          Here's a quick look at your recipe statistics. Keep cooking and
          sharing!
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} dark:shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300`}
          >
            <div className="mb-4">{card.icon}</div>
            <p className="text-4xl font-extrabold text-gray-800 dark:text-white">
              {card.count}
            </p>
            <p className="text-md mt-2 font-medium text-gray-700 dark:text-gray-300">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
