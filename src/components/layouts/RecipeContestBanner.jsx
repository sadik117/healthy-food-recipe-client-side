import { Trophy } from "lucide-react";
import { Link } from "react-router";

const RecipeContestBanner = () => {
  return (
    <div className="overflow-hidden mb-6 flex flex-col md:flex-row min-h-[350px] px-4 py-8 mx-auto md:px-8">
      
      {/* Left Image Section */}
      <div className="flex-1 relative">
        <img
          src="https://i.ibb.co/pvVW3j2R/Cooking-Contest-winners.jpg"
          alt="Delicious Food"
          className="object-cover w-full h-full"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-sky-900/30" />
      </div>

      {/* Right Content Section */}
      <div className="flex-1 bg-sky-100 dark:bg-sky-900 p-10 flex flex-col justify-center z-10">
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={36} className="text-sky-600 dark:text-sky-300" />
          <h2 className="text-3xl font-bold text-sky-800 dark:text-white">
            Best Recipe Contest
          </h2>
        </div>

        <p className="text-sky-800 dark:text-sky-100 text-lg mb-6 max-w-md">
          Share your most mouthwatering recipe and win a surprise gourmet gift box! 🍱✨
        </p>

        <Link to="/contact-us" className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md w-fit">
          Submit Your Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeContestBanner;
