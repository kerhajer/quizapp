import React from 'react';
import Home from './pages/Home'
import Quiz from './pages/Quiz'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/question" element={<Quiz/>} />


   
     
    </Routes>
  </Router>
  );
}

export default App;
