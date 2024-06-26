import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './utilities/Navbar';
import Map from './Home/Map';
import Description from './Home/Description';
import Kota from './Home/Kota';
import Carousel from './Home/Carousel';
import Footer from './utilities/Footer';
import Trivia from './Game/Trivia';
import AboutUs from './Us'; 
import News from './Berita/news';
import NewsPage from './Berita/NewsPage';
import Seni from './Berita/seni';
import Pahlawan from './Berita/pahlawan';

import PapuaTengah from './papua/papuaTengah';
import PapuaPegunungan from './papua/papuaPegunungan';
import PapuaSelatan from './papua/papuaSelatan';
import Papua from './papua/Papua';
import PapuaBarat from './papua/PapuaBarat';
import PapuaDaya from './papua/PapuaDaya';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-customWhite' : 'bg-customBlack'}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/papuaPegunungan" element={<PapuaPegunungan theme={theme}/>} />
          <Route path="/papuaSelatan" element={<PapuaSelatan theme={theme}/>} />
          <Route path="/papuaTengah" element={<PapuaTengah theme={theme}/>} />
          <Route path="/papua" element={<Papua theme={theme}/>} />
          <Route path="/papuaBarat" element={<PapuaBarat theme={theme}/>} />
          <Route path="/papuaDaya" element={<PapuaDaya theme={theme}/>} />
          <Route path="/Trivia" element={<Trivia theme={theme}/>} />
          <Route path="/Us" element={<AboutUs theme={theme}/>} />
          <Route path="/news" element={<News theme={theme}/>} />
          <Route path="/NewsPage" element={<NewsPage theme={theme}/>} />
          <Route path="/seni" element={<Seni theme={theme}/>} />
          <Route path="/pahlawan" element={<Pahlawan theme={theme}/>} />
        </Routes>
        <Footer theme={theme}/>
      </div>
    </Router>
  );
}

function Home({ theme, toggleTheme }) {
  return (
    <div className="flex flex-col items-center space-y-10">
      <Map className="w-full" />
      <Description theme={theme} />
      <div className="mt-10">
        <Kota theme={theme} />
      </div>
      <Carousel theme={theme} />
    </div>
  );
}

export default App;
