const express = require('express');
const app = express();
const fs = require('fs');
const transitRouter = require('./routes/transit'); 
const cors = require('cors'); 


app.use(cors());

const stopsData = {};


fs.readFile('data/stops.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split('\n');
  for (const line of lines) {
    const [stop_id, stop_name, stop_lat, stop_lon, location_type, parent_station] = line.split(',');
    if (parent_station) {
      stopsData[stop_id] = stopsData[parent_station];
    } else {
      stopsData[stop_id] = stop_name;
    }
  }
  console.log('Stops data loaded:', stopsData);
});


app.get('/api/stops', (req, res) => {
  console.log('Sending Stops Data:', JSON.stringify(stopsData));
  res.setHeader('Content-Type', 'application/json');
  res.json(stopsData);
});


app.use('/transit', transitRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

