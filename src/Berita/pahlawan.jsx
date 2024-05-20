import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pahlawan = () => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pahlawan Daerah Papua</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHeroes.map(hero => (
          <div key={hero.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{hero.name}</h2>
            <p className="mt-2 text-gray-600">{hero.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pahlawan;
