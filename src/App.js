import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Teams from './components/Teams/Teams';
import Matches from './components/Matches/Matches';
import Table from './components/Table/Table'; // Importujemy nowy komponent
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import Players from './components/Players/Players';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mecze" element={<Matches />} />
        <Route path="/druzyny" element={<Teams />} />
        <Route path="/tabela" element={<Table />} /> {/* Dodajemy trasę dla tabeli */}
        <Route path='/kontakt' element={<Contact />} />
        <Route path='/zawodnicy' element={<Players />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
