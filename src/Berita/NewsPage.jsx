import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = 'pub_44511a2b75fc6a6012efb998a1526e4f8a9da';
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=Papua&country=id&language=id`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const articles = data.results.map(article => ({
          title: article.title,
          description: limitDescriptionToSentences(article.description, 20),
          url: article.link,
          urlToImage: article.image_url || 'https://via.placeholder.com/150'
        }));

        setNews(articles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the news:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const limitDescriptionToSentences = (description, maxSentences) => {
    if (!description) return '';
    const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
    return sentences.slice(0, maxSentences).join(' ');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error fetching news.</div>;
  }

  return (
    <div className="p-4 min-h-screen">
      <Link to="/news" className="absolute left-0 text-gray-700 text-xl font-bold hover:text-customRed transition-colors duration-300 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </Link>
      <h1 className="text-3xl font-bold text-center mb-8">Berita Papua</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-4">{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
