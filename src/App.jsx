import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './utilities/Navbar';
import Map from './Home/Map';
import Description from './Home/Description';
import Kota from './Home/Kota';
import Carousel from './Home/Carousel';
import Footer from './utilities/Footer';
import Quiz from './Game/Quiz';
import './Game/Quiz.css';
import Trivia from './Game/Trivia';
import AboutUs from './Us'; 
import News from './Berita/news';
import Berita from './Berita/NewsPage';
import Seni from './Berita/seni';
import NewsPage from './Berita/NewsPage';

import PapuaTengah from './papua/papuaTengah';
import PapuaPegunungan from './papua/papuaPegunungan';
import PapuaSelatan from './papua/papuaSelatan';
import Papua from './papua/Papua';
import PapuaBarat from './papua/PapuaBarat';
import PapuaDaya from './papua/PapuaDaya';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-costumWhite">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/papuaPegunungan" element={<PapuaPegunungan />} />
          <Route path="/papuaSelatan" element={<PapuaSelatan />} />
          <Route path="/papuaTengah" element={<PapuaTengah />} />
          <Route path="/papua" element={<Papua />} />
          <Route path="/papuaBarat" element={<PapuaBarat />} />
          <Route path="/papuaDaya" element={<PapuaDaya />} />
          <Route path="/Trivia" element={<Trivia />} />
          <Route path="/Us" element={<AboutUs />} />
          <Route path="/news" element={<News />} />
          <Route path="/NewsPage" element={<NewsPage />} />
          <Route path="/seni" element={<Seni />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center space-y-10">
      <Map className="w-full" />
      <Description />
      <div className="mt-10">
        <Kota />
      </div>
      <Carousel />
    </div>
  );
}

export default App;
