import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { url: 'https://youtu.be/jhGnb4uOUdY?si=W6VlwljXYQO_hK-L', title: "Explore Nature", description: "Discover the breathtaking natural beauty of Papua's forests, mountains, and beaches." },
    { url: 'https://youtu.be/Q-OWraAwJOE?si=U1OcxROU8ipTpLel', title: "Adventure Awaits", description: "Embark on an unforgettable journey to explore hidden gems and thrilling adventures." },
    { url: 'https://youtu.be/EoZPClz_2Jo?si=Eueg9Dde313mzVnC', title: "Conquer Peaks", description: "Challenge yourself to reach new heights and conquer majestic mountain peaks." },
    { url: 'https://youtu.be/uxtR-qYJU5Y?si=CbFnSLBblE0EAit8', title: "Relaxation Paradise", description: "Unwind and relax in the serene ambiance of pristine beaches and crystal-clear waters." },
    { url: 'https://youtu.be/2v2py1-I17M?si=I-xuDVVsvwRVm-Ee', title: "Into the Wilderness", description: "Immerse yourself in the untouched beauty of dense forests and untamed wilderness." }
  ];

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  return (
    <div className="carousel text-center mx-auto relative w-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 left-5">
        <button onClick={goToPreviousCard} className="btn btn-circle bg-gray-200 hover:bg-gray-300 text-gray-700">
          ❮
        </button>
      </div>
      <div className="carousel-container flex justify-center items-center h-full w-full">
        <div className="card bg-customRed text-white p-8 m-4 rounded-lg shadow-lg w-full max-w-3xl flex flex-col items-center">
          <div className="card-image mb-4 flex justify-center w-full">
            <ReactPlayer url={cards[currentIndex].url} className="w-full h-64" />
          </div>
          <h2 className="card-title text-3xl mb-2 text-center text-white">{cards[currentIndex].title}</h2>
          <p className="card-description text-lg font-bold text-white text-center">{cards[currentIndex].description}</p>
        </div>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-5">
        <button onClick={goToNextCard} className="btn btn-circle bg-gray-200 hover:bg-gray-300 text-gray-700">
          ❯
        </button>
      </div>
    </div>
  );
}

export default Carousel;
