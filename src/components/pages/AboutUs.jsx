import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <Helmet>
        <title>About Us | Recipe Book</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Image */}
          <img
            src="https://i.ibb.co/ds27R13D/twha-ezay-210204.jpg"
            alt="About us"
            className="rounded-2xl shadow-lg w-full h-full object-cover"
          />

          {/* Right: Text */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to Recipe Book</h1>
            <p className="mb-4 text-lg leading-relaxed">
              At <span className="font-semibold text-sky-600">Recipe Book</span>, we believe in the power of good food to bring people together.
              Our platform is a digital cookbook where food lovers can explore, share, and manage their favorite recipes with ease.
            </p>
            <p className="mb-4">
              Whether you're a seasoned chef or just starting your culinary journey, our tools make it simple to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>📖 Save and organize your recipes</li>
              <li>🥘 Explore global cuisines</li>
              <li>📝 Track your cooking progress</li>
              <li>❤️ Like and review recipes</li>
            </ul>
            <p>
              We’re committed to making your cooking experience organized, fun, and social. Let’s cook something amazing together!
            </p>
          </div>
        </motion.div>

        {/* Optional: Team or Creator Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-2">Made with ❤️ by Sadik</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Developer | Foodie | Lifelong Learner
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
