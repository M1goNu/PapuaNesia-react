import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pahlawan = () => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [news, setNews] = useState([]);
  const NEWS_API_KEY = '3fc43beabbec409788843978bc597b03';

  useEffect(() => {
    // Fetch heroes data
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

    // Fetch news data from News API
    axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'Papua Indonesia',
        apiKey: '3fc43beabbec409788843978bc597b03',
        language: 'id',
        pageSize: 10, // Number of articles to retrieve
        sortBy: 'publishedAt', // Sort by publication date
        image: 'urlToImage' // Include only articles with images
      }
    })
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        console.error("There was an error fetching the news data!", error);
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
      <h2 className="text-2xl font-bold mt-8 mb-4">Berita Terbaru tentang Papua, Indonesia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="mt-2 rounded-lg" />}
              <p className="mt-2 text-gray-600">{article.description}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pahlawan;
