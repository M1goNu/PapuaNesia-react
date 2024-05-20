import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../Cards/WeatherCard';
import Card from '../Cards/Card';
import { Link } from 'react-router-dom';

function News() {
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
    <div className="min-h-screen flex flex-col items-center p-4">
      <main className="flex flex-wrap justify-center mt-6">
        {weatherData.map((weather, index) => (
          <WeatherCard key={index} weather={weather} />
        ))}
      </main>
      <div className="flex flex-wrap justify-center mt-6 gap-6">
        <Link to="/NewsPage" className="no-underline">
          <Card 
            image="./Gambar/koran.jpg" 
            title="Berita" 
          />
        </Link>
        <Link to="/seni" className="no-underline">
          <Card 
            image="./Gambar/pop.png" 
            title="Papua Pop" 
          />
        </Link>
        <Link to="/pahlawan" className="no-underline">
          <Card 
            image="./Gambar/pahlawan.png" 
            title="pahlawan" 
          />
        </Link>
      </div>
    </div>
  );
}

export default News;
