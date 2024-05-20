import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PapuaDaya() {
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
        const summaryResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/summary/Papua_Barat_Daya');
        setContent(summaryResponse.data.extract);
        setDescription(summaryResponse.data.description);
        if (summaryResponse.data.thumbnail) {
          setImage(summaryResponse.data.thumbnail.source);
        }

        const pageResponse = await axios.get('https://id.wikipedia.org/api/rest_v1/page/html/Papua_Barat_Daya');
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageResponse.data, 'text/html');

        const sections = ['Sejarah', 'Kebudayaan', 'Pariwisata'];

        const sectionContent = {
          Sejarah: '',
          Kebudayaan: '',
          Pariwisata: ''
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
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Papua Barat Daya</h1>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              {image && (
                <div className="flex justify-center mb-4">
                  <img src={image} alt="Papua Daya" className="w-auto h-auto mb-4 rounded-lg" />
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

export default PapuaDaya;