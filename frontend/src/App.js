import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './screens/Main';
import TrainDetails from './screens/TrainDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/train/:trainId" element={<TrainDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
