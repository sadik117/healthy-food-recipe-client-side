import React from 'react';
import Counter from './Counter';

const StatsSection = () => {
  return (
    <div className="py-10 px-4 md:px-20 max-w-7xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-extrabold text-center mb-3">
        Recipe App Statistics
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
        A glance at our food lovers' community.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Counter icon="🍲" number={850} label="Total Recipes" />
        <Counter icon="👨‍🍳" number={300} label="Registered Chefs" />
        <Counter icon="❤️" number={120000} label="Total Likes" />
        <Counter icon="👥" number={50000} label="Active Users" />
      </div>
    </div>
  );
};

export default StatsSection;
