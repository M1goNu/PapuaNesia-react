import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PapuaTengah() {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [culture, setCulture] = useState('');
  const [tourism, setTourism] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/summary/Papua_Tengah');
        console.log(summaryResponse.data);
        setContent(summaryResponse.data.extract);
        setDescription(summaryResponse.data.description);
        if (summaryResponse.data.thumbnail) {
          setImage(summaryResponse.data.thumbnail.source);
        }

        const pageResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/html/Papua_Tengah');
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageResponse.data, 'text/html');

        // Extract Culture section
        const cultureSection = doc.querySelector('#Kebudayaan');
        if (cultureSection) {
          const cultureContent = cultureSection.nextElementSibling.innerHTML;
          const updatedCultureContent = updateImageClass(cultureContent);
          setCulture(updatedCultureContent);
        }

        // Extract Tourism section
        const tourismSection = doc.querySelector('#Pariwisata');
        if (tourismSection) {
          const tourismContent = tourismSection.nextElementSibling.innerHTML;
          const updatedTourismContent = updateImageClass(tourismContent);
          setTourism(updatedTourismContent);
        }

      } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Papua Selatan</h1>
          {image && (
            <div className="flex justify-center mb-4">
              <img src={image} alt="Papua Selatan" className="w-auto h-auto mb-4 rounded-lg" />
            </div>
          )}
          <h2 className="text-xl font-semibold mb-2">{description}</h2>
          <p className="text-gray-700 mb-4">{content}</p>
          
          {culture && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Kebudayaan</h2>
              <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: culture }} />
            </div>
          )}
          
          {tourism && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Pariwisata</h2>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: tourism }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PapuaTengah;
