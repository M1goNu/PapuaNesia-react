import React from 'react';

function Description({ theme }) {
  return (
    <div className={`description-container rounded-lg p-8 ${theme === 'light' ? 'text-customBlack' : 'text-customWhite'}`}>
      <h2 className="text-6xl font-bold mb-4 text-center">Discover the Beauty of Papua</h2>
      <p className="text-lg text-center text-3xl">Explore the stunning landscapes, rich cultural heritage, and diverse wildlife of Papua, Indonesia.</p>
    </div>
  );
}

export default Description;
