import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StationDetailsScreen = () => {
  const { station } = useParams();
  const navigate = useNavigate();
  const trainStatuses = [
    { train: '1', status: 'On Time' },
    { train: '2', status: 'Delayed' },
  ]; // Example statuses

  return (
    <div>
      <h1>Station {station}</h1>
      <ul>
        {trainStatuses.map((status, index) => (
          <li key={index}>
            Train {status.train}: {status.status}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default StationDetailsScreen;
