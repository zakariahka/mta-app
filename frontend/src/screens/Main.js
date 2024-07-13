import React from 'react';
import TrainButton from '../components/TrainButton';

function Main() {
  const trainCategories = [
    { trains: ['A', 'C', 'E'], color: 'blue' },
    { trains: ['B', 'D', 'F', 'M'], color: 'orange' },
    { trains: ['N', 'Q', 'R', 'W'], color: '#FFD700' },
    { trains: ['G'], color: 'green' },
    { trains: ['1', '2', '3', '4', '5', '6', '7'], color: 'red' },
    { trains: ['J', 'Z'], color: 'brown' },
    { trains: ['L'], color: 'grey' },
  ];

  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    backgroundColor: '#282c34',
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(16px + 2vmin)',
    color: 'white',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
  };



  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1>Train Schedule</h1>
      </header>
      <div style={buttonContainerStyle}>
        {trainCategories.map((category, index) => (
          <div key={index} style={buttonContainerStyle}>
            {category.trains.map((train, trainIndex) => (
              <TrainButton key={trainIndex} group={train} color={category.color} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
