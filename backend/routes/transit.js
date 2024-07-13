const express = require('express');
const transitRouter = express.Router();
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const trainIdToGroup = {
  '1': '',
  '2': '',
  '3': '',
  '4': '',
  '5': '',
  '6': '',
  '7': '',
  'A': '-ace',
  'C': '-ace',
  'E': '-ace',
  'B': '-bdfm',
  'D': '-bdfm',
  'F': '-bdfm',
  'M': '-bdfm',
  'G': '-g',
  'J': '-jz',
  'Z': '-jz',
  'L': '-l',
  'N': '-nqrw',
  'Q': '-nqrw',
  'R': '-nqrw',
  'W': '-nqrw',
};


transitRouter.get('/realtime/:trainId', async (req, res, next) => {
  const trainId = req.params.trainId.toUpperCase();
  const trainGroup = trainIdToGroup[trainId]


  try {
    console.log(`Fetching data for train ID: ${trainId}`);  
    const fetch = await import('node-fetch');
    const response = await fetch.default(`https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs${trainGroup}`, {
      headers: {
        "x-api-key": "RU0gVzXH042AHIbqHF0jr8OBFYr3QCM99mfQRm7U",
      },
    });

    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    }
    
    const buffer = await response.arrayBuffer();
    console.log('Received data, decoding...');  
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
    const filteredUpdates = feed.entity
      .map(entity => entity.tripUpdate)
      .filter(update => update && update.trip.routeId === trainId);

    console.log('Filtered data, sending response...');  
    res.json(filteredUpdates);
  } catch (error) {
    console.error(`Error fetching data for train ID ${trainId}:`, error);  
    res.status(500).send('Internal Server Error');
  }
});




module.exports = transitRouter;
