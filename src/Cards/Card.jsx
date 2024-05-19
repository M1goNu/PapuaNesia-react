import React from 'react';

function Card({ image, title, description, onClick }) {
  return (
    <div className="card shadow-lg rounded-lg overflow-hidden max-w-xs mx-4 my-2 cursor-pointer bg-customRed" onClick={onClick}>
      {typeof image === 'string' ? (
        <img className="w-full h-auto" src={image} alt={title} />
      ) : (
        <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute top-0 left-0 w-full h-full">
            {React.cloneElement(image, { width: '100%', height: '100%' })}
          </div>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className="text-blue-500 hover:underline mt-2 block">
          {description}
        </a>
      </div>
    </div>
  );
}

export default Card;
