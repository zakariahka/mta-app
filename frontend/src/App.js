import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainLinesScreen from './screens/TrainLinesScreen';
import RouteDetailsScreen from './screens/RouteDetailsScreen';
import StationDetailsScreen from './screens/StationDetailsScreen';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TrainLinesScreen />} />
      <Route path="/route/:lineId" element={<RouteDetailsScreen />} />
      <Route path="/station/:station" element={<StationDetailsScreen />} />
    </Routes>
  </Router>
);

export default App;
