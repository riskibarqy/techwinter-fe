import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-96 bg-gradient-to-r from-black via-gray-900 to-red-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wider">
          DROP <span className="text-red-500">DEAD</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Streetwear That Speaks Volumes
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 hover:shadow-lg">
          Shop Collection
        </button>
      </div>
    </div>
  );
}