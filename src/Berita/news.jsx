import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../Cards/WeatherCard';
import Card from '../Cards/Card';
import { Link } from 'react-router-dom';

function News({theme}) {
  const [weatherData, setWeatherData] = useState([]);
  const locations = ['Jayapura', 'Manokwari', 'Timika'];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          locations.map(location =>
            axios.get(`https://api.weatherapi.com/v1/current.json?key=f7709cb75d00463cbe2163833241405&q=${location}`)
          )
        );
        setWeatherData(responses.map(response => response.data));
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 mt-5 mb-5">
      <main className="w-full max-w-6xl mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weatherData.map((weather, index) => (
            <WeatherCard key={index} weather={weather} />
          ))}
        </div>
      </main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/NewsPage" className="no-underline">
          <Card 
            image="./Gambar/koran.jpg" 
            title="Berita" 
            theme={theme}
          />
        </Link>
        <Link to="/seni" className="no-underline">
          <Card 
            image="./Gambar/pop.png" 
            title="Papua Pop" 
            theme={theme}
          />
        </Link>
        <Link to="/pahlawan" className="no-underline">
          <Card 
            image="./Gambar/pahlawan.png" 
            title="pahlawan" 
            theme={theme}
          />
        </Link>
      </div>
    </div>
  );
}

export default News;
