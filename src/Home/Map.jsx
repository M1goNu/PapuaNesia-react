import React, { useState, useEffect, useRef } from 'react';

// Definisi slides dengan format href="images"
const slides = [
  { href: "Gambar/baru.jpg" },
  { href: "Gambar/map.jpg" },
  { href: "Gambar/2.jpg" },
  { href: "Gambar/papua1.jpg" }
];

function Map() {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const slideIntervalRef = useRef(null);

  useEffect(() => {
    startSlideInterval();

    return () => {
      clearInterval(slideIntervalRef.current);
    };
  }, []);

  const startSlideInterval = () => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); // Fix slide change logic
    }, 3000);
  };

  const handleSlideChange = (slideNumber) => {
    clearInterval(slideIntervalRef.current);
    setCurrentSlide(slideNumber);
    startSlideInterval();
  };

  return (
    <div className="carousel w-full relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          id={`slide${index + 1}`}
          className={`carousel-item relative w-full ${currentSlide === index ? 'block' : 'hidden'}`} // Adjusted index comparison
        >
          <img src={slide.href} className="w-full" alt={`Slide ${index + 1}`} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              className="btn btn-circle"
              onClick={() => handleSlideChange((index - 1 + slides.length) % slides.length)} // Adjusted previous slide logic
            >
              ❮
            </button>
            <button
              className="btn btn-circle"
              onClick={() => handleSlideChange((index + 1) % slides.length)} // Adjusted next slide logic
            >
              ❯
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-center mb-4">
            <div className="flex justify-center items-center">
              {slides.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  onClick={() => handleSlideChange(dotIndex)}
                  className={`h-4 w-4 rounded-full mx-1 cursor-pointer ${dotIndex === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`} // Adjusted dot index comparison
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Map;
