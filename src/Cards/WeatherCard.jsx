import React from 'react';

const WeatherCard = ({ weather }) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-gradient-to-r from-blue-300 to-blue-500 p-6 m-4">
      <h2 className="text-3xl font-bold text-white mb-4">{weather.location.name}</h2>
      <div className="flex items-center justify-center mb-4">
        <img className="w-20 h-20 mr-4" src={weather.current.condition.icon} alt="weather icon" />
        <div>
          <p className="text-xl text-white">{weather.current.condition.text}</p>
          <p className="text-5xl text-white font-bold">{weather.current.temp_c}°C</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg text-white">Kelembaban: {weather.current.humidity}%</p>
        <p className="text-lg text-white">Kecepatan Angin: {weather.current.wind_kph} km/h</p>
      </div>
    </div>
  );
};

export default WeatherCard;
