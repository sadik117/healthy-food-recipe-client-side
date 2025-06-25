import React from 'react';
import CountUp from 'react-countup';

const Counter = ({ icon, number, label }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl mb-3">{icon}</div>
      <h2 className="text-3xl font-extrabold text-[#0F0F0F]">
        <CountUp end={number} duration={10} /> +
      </h2>
      <p className="text-gray-500 mt-2">{label}</p>
    </div>
  );
};

export default Counter;
