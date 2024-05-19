import React, { useEffect, useState } from 'react';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=Papua&language=id&apiKey=3fc43beabbec409788843978bc597b03')
      .then(response => response.json())
      .then(data => {
        const filteredArticles = data.articles.filter(article => {
          const title = article.title.toLowerCase();
          return !title.includes('viagra') && !title.includes('obat kuat');
        });

        setNews(filteredArticles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the news:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error fetching news.</div>;
  }

  return (
    <div className="p-4 min-h-screen">
      <a href="/news" className="absolute left-0 text-gray text-xl font-bold hover:text-white transition-colors duration-300 p-4">Back</a>
      <h1 className="text-3xl font-bold text-center mb-8">Berita Papua</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-costumWhite p-6 rounded-lg shadow-lg">
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
