import React from 'react';

const Logo = () => {
  return (
    <div style={styles.container}>
      <div style={styles.text}>Train Time</div>
      <div style={styles.line} />
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid black', 
  },
  text: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  line: {
    width: '100%', 
    height: '5px',
    backgroundColor: 'black', 
    marginTop: '5px', 
  },
};

export default Logo;
