import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const cardsData = [
  { image: './Gambar/gunung.png', title: 'Papua Pegunungan', route: '/papuaPegunungan' },
  { image: './Gambar/tengah.png', title: 'Papua Tengah', route: '/papuaTengah' },
  { image: './Gambar/selatan.jpg', title: 'Papua Selatan', route: '/papuaSelatan' },
  { image: './Gambar/papua.png', title: 'Papua', route: '/papua' },
  { image: './Gambar/barat.png', title: 'Papua Barat', route: '/papuaBarat' },
  { image: './Gambar/daya.png', title: 'Papua Barat Daya', route: '/papuaDaya' },
];

function Kota() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = Math.ceil(cardsData.length / 3);

  const handleSlideChange = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  const handlePrevButtonClick = (event) => {
    event.preventDefault();
    const prevSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    handleSlideChange(prevSlide);
  };

  const handleNextButtonClick = (event) => {
    event.preventDefault();
    const nextSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    handleSlideChange(nextSlide);
  };

  return (
    <div className="kota flex justify-center items-center px-4">
      <div className="carousel w-full relative">
        {[...Array(totalSlides)].map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`carousel-item relative w-full ${currentSlide === slideIndex + 1 ? 'block' : 'hidden'}`}
          >
            <div className="flex flex-wrap justify-center">
              {cardsData.slice(slideIndex * 3, (slideIndex + 1) * 3).map((card, index) => (
                <Card
                  key={index}
                  image={card.image}
                  title={card.title}
                  route={card.route}
                />
              ))}
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
              <button
                className="btn btn-circle"
                onClick={handlePrevButtonClick}
              >❮</button>
              <button
                className="btn btn-circle"
                onClick={handleNextButtonClick}
              >❯</button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-center mb-4">
              <div className="flex justify-center items-center">
                {[...Array(totalSlides)].map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleSlideChange(index + 1)}
                    className={`h-4 w-4 rounded-full mx-1 cursor-pointer ${index + 1 === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Card = ({ image, title, route }) => (
  <Link
    to={route}
    className="relative card w-64 h-80 p-4 border border-gray-300 rounded-lg transition-transform duration-300 ease-in-out bg-customRed shadow-lg"
    style={{ margin: '10px' }}
  >
    <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg mb-2 text-white-800 text-center">{title}</h3>
  </Link>
);

export default Kota;
