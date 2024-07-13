import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RouteDetailsScreen = () => {
  const { lineId } = useParams();
  const navigate = useNavigate();
  const stations = ['Station 1', 'Station 2', 'Station 3']; 
  const handleStationClick = (station) => {
    navigate(`/station/${station}`);
  };

  return (
    <div>
      <h1>Train Line {lineId} Route</h1>
      <ul>
        {stations.map((station) => (
          <li key={station} onClick={() => handleStationClick(station)}>
            {station}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default RouteDetailsScreen;
