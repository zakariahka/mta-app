import React from 'react';
import { Link } from 'react-router-dom';

function TrainButton({ group, color }) {
  const buttonStyle = {
    borderRadius: '50%', 
    padding: '25px 30px', 
    margin: '10px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    fontSize: '1.2em',
    backgroundColor: color,
    display: 'inline-flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '120px', 
    height: '120px', 
    textDecoration: 'none',
  };

  return (
    <Link to={`/train/${group}`} style={{ textDecoration: 'none' }}>
      <button style={buttonStyle}>{group}</button>
    </Link>
  );
}

export default TrainButton;
