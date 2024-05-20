import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Papua() {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [history, setHistory] = useState('');
  const [culinary, setCulinary] = useState('');
  const [traditionCulture, setTraditionCulture] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/summary/Papua');
        setContent(summaryResponse.data.extract);
        setDescription(summaryResponse.data.description);
        if (summaryResponse.data.thumbnail) {
          setImage(summaryResponse.data.thumbnail.source);
        }

        const pageResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/html/Papua');
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageResponse.data, 'text/html');

        const sections = ['Sejarah', 'Tradisi_dan_budaya'];
        const sectionContent = {
          Sejarah: '',
          Tradisi_dan_budaya: ''
        };

        sections.forEach(section => {
          const sectionElement = doc.querySelector(`#${section}`);
          if (sectionElement) {
            let nextElement = sectionElement.nextElementSibling;
            let content = '';

            while (nextElement && !sections.includes(nextElement.tagName === 'H2' ? nextElement.id : '')) {
              content += nextElement.outerHTML;
              nextElement = nextElement.nextElementSibling;
            }

            sectionContent[section] = updateImageClass(content);
          }
        });

        setHistory(sectionContent.Sejarah);
        setTraditionCulture(sectionContent.Tradisi_dan_budaya);

      } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false when data fetching is done
      }
    };

    fetchData();
  }, []);

  const updateImageClass = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      img.classList.add('w-250', 'h-250', 'mb-4', 'rounded-lg');
    });
    return doc.body.innerHTML;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-800">Papua Selatan</h1>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {image && (
              <div className="flex justify-center mb-4">
                <img src={image} alt="Papua Selatan" className="w-full max-w-4xl rounded-lg" />
              </div>
            )}
            <p className="text-gray-800 text-lg mb-6">{description}</p>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Sejarah</h2>
              <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: history }} />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Tradisi dan Budaya</h2>
              <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: traditionCulture }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Papua;
