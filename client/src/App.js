import React from 'react';
import Home from './pages/Home'
import Quiz from './pages/Quiz'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Questions from './pages/Questions';
import Result from './pages/Result';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/questions" element={<Quiz/>} />

      <Route path="/questions/find/:id" element={<Questions/>} />
      <Route path="/results/" element={<Result/>} />

     
    </Routes>
  </Router>
  );
}

export default App;
