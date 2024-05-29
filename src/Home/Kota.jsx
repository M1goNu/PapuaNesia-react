import React from 'react';
import { Link } from 'react-router-dom';
import mapImage from '/Gambar/barum.png';

export const cardsData = [
  { image: './Gambar/gunung.png', title: 'Papua Pegunungan', route: '/papuaPegunungan', area: 'papuaPegunungan', position: { top: '45%', left: '85%' } },
  { image: './Gambar/tengah.png', title: 'Papua Tengah', route: '/papuaTengah', area: 'papuaTengah', position: { top: '45%', left: '60%' } },
  { image: './Gambar/selatan.jpg', title: 'Papua Selatan', route: '/papuaSelatan', area: 'papuaSelatan', position: { top: '63%', left: '85%' } },
  { image: './Gambar/papua.png', title: 'Papua', route: '/papua', area: 'papua', position: { top: '30%', left: '77%' } },
  { image: './Gambar/barat.png', title: 'Papua Barat', route: '/papuaBarat', area: 'papuaBarat', position: { top: '18%', left: '28%' } },
  { image: './Gambar/daya.png', title: 'Papua Barat Daya', route: '/papuaDaya', area: 'papuaBaratDaya', position: { top: '35%', left: '30%' } },
];

function Kota() {
  return (
    <div className="relative inline-block overflow-hidden">
      <img src={mapImage} alt="provinsi Papua" className="block" />

      {cardsData.map((card, index) => (
        <Link
          key={index}
          to={card.route}
          className="absolute w-6 h-6 text-red-500 cursor-pointer"
          style={{ top: card.position.top, left: card.position.left, zIndex: 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-full h-full"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        </Link>
      ))}
    </div>
  );
}

export default Kota;
