import React from 'react';
import { useNavigate } from 'react-router-dom';

const trainLines = ['1', '2', '3', 'A', 'B', 'C', 'D'];

const TrainLinesScreen = () => {
  const navigate = useNavigate();

  const handleLineClick = (lineId) => {
    navigate(`/route/${lineId}`);
  };

  return (
    <div>
      <h1>Select a Train Line</h1>
      <ul>
        {trainLines.map((line) => (
          <li key={line} onClick={() => handleLineClick(line)}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainLinesScreen;
