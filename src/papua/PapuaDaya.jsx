import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PapuaDaya() {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://id.wikipedia.org/api/rest_v1/page/summary/Papua_Selatan');
        setContent(response.data.extract);
        setDescription(response.data.description);
        if (response.data.thumbnail) {
          setImage(response.data.thumbnail.source);
        }
      } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Papua Daya</h1>
          {image && <img src={image} alt="Papua Daya" className="w-full h-auto mb-4 rounded-lg" />}
          <h2 className="text-xl font-semibold mb-2">{description}</h2>
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default PapuaDaya;
