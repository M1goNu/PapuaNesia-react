import React from 'react';
import { Link } from 'react-router-dom';

export const cardsData = [
  { image: './Gambar/gunung.png', title: 'Papua Pegunungan', route: '/papuaPegunungan' },
  { image: './Gambar/tengah.png', title: 'Papua Tengah', route: '/papuaTengah' },
  { image: './Gambar/selatan.jpg', title: 'Papua Selatan', route: '/papuaSelatan' },
  { image: './Gambar/papua.png', title: 'Papua', route: '/papua' },
  { image: './Gambar/barat.png', title: 'Papua Barat', route: '/papuaBarat' },
  { image: './Gambar/daya.png', title: 'Papua Barat Daya', route: '/papuaDaya' },
];

function Kota({ theme }) {
  return (
    <div className="kota flex justify-center items-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            route={card.route}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

const Card = ({ image, title, route, theme }) => (
  <Link
    to={route}
    className={`relative card w-64 h-80 p-4 border border-gray-300 rounded-lg transition-transform duration-300 ease-in-out shadow-lg ${theme === 'light' ? 'bg-customRed' : 'bg-costumBlue'}`}
    style={{ margin: '10px' }}
  >
    <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg font-bold text-white text-center">{title}</h3>
  </Link>
);

export default Kota;
