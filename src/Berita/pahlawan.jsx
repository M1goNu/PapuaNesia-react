import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pahlawan = ({theme}) => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);

  useEffect(() => {
    axios.get('https://indonesia-public-static-api.vercel.app/api/heroes')
      .then(response => {
        setHeroes(response.data);
        const filtered = response.data.filter(hero => {
          return hero.region === "Papua" || hero.description.toLowerCase().includes("papua");
        });
        setFilteredHeroes(filtered);
      })
      .catch(error => {
        console.error("There was an error fetching the hero data!", error);
      });
  }, []);

  return (
    <div className={`container flex flex-col mx-auto p-4 relative ${theme === 'light' ? 'bg-customWhite text-customBlack' : 'bg-customBlack text-customWhite'}`}>
      <Link to="/news" className="absolute left-0 text-gray-700 text-xl font-bold hover:text-customRed transition-colors duration-300 p-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-center">Pahlawan Daerah Papua</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHeroes.map(hero => (
          <div key={hero.id} className={`shadow-md rounded-lg p-4 ${theme === 'light' ? 'bg-customRed text-customWhite' : 'bg-costumBlue text-customWhite'}`}>
            <h2 className="text-2xl font-bold">{hero.name}</h2>
            <p className="mt-2">{hero.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pahlawan;
