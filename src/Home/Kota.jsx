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

function Kota() {
  return (
    <div className="kota flex justify-center items-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            route={card.route}
          />
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
