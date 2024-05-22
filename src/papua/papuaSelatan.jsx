import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PapuaSelatan() {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [history, setHistory] = useState('');
  const [culture, setCulture] = useState('');
  const [tourism, setTourism] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/summary/Papua_Selatan');
        setContent(summaryResponse.data.extract);
        setDescription(summaryResponse.data.description);
        if (summaryResponse.data.thumbnail) {
          setImage(summaryResponse.data.thumbnail.source);
        }

        const pageResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/html/Papua_Selatan');
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageResponse.data, 'text/html');

        const sections = ['Sejarah', 'Kebudayaan', 'Pariwisata', 'Tradisi_dan_budaya'];

        const sectionContent = {
          Sejarah: '',
          Kebudayaan: '',
          Pariwisata: '',
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
        setCulture(sectionContent.Kebudayaan);
        setTourism(sectionContent.Pariwisata);

      } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateImageClass = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('flex', 'justify-center', 'mb-4');
      img.classList.add('w-full', 'h-full', 'rounded-lg');
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });
    return doc.body.innerHTML;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
        <Link to="/" className="absolute left-0 text-gray-700 text-xl font-bold hover:text-customRed transition-colors duration-300 p-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      </Link>
          <h1 className="text-3xl font-bold mb-4 text-center">Papua Selatan</h1>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              {image && (
                <div className="flex justify-center mb-4">
                  <img src={image} alt="Papua Selatan" className="w-auto h-auto mb-4 rounded-lg" />
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{description}</h2>
              <p className="text-gray-700 mb-4">{content}</p>
              
              {history && (
                <div className='"bg-white rounded-lg shadow-lg p-6 mb-8"'>
                  <h2 className="text-xl font-semibold mb-2">Sejarah</h2>
                  <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: history }} />
                </div>
              )}
              
              {culture && (
                <div className='"bg-white rounded-lg shadow-lg p-6 mb-8"'>
                  <h2 className="text-xl font-semibold mb-2">Kebudayaan</h2>
                  <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: culture }} />
                </div>
              )}

              {tourism && (
                <div className='"bg-white rounded-lg shadow-lg p-6 mb-8"'>
                  <h2 className="text-xl font-semibold mb-2">Pariwisata</h2>
                  <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: tourism }} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PapuaSelatan;
