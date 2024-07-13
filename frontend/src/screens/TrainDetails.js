import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

function TrainDetails() {
  const [data, setData] = useState(null);
  const [stopsData, setStopsData] = useState({});
  const [groupedData, setGroupedData] = useState({});
  const { trainId } = useParams();
  const [expandedStation, setExpandedStation] = useState(null);

  const getStopName = useCallback(
    (stopId) => {
      return stopsData[stopId] ? stopsData[stopId] : stopId;
    },
    [stopsData]
  );

  useEffect(() => {
    async function loadStopsData() {
      try {
        const response = await fetch('http://127.0.0.1:5000');
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const stops = await response.json();
        setStopsData(stops);
      } catch (error) {
        console.error('Error loading stops data:', error);
      }
    }

    loadStopsData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/transit/realtime/${trainId}`);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        const filteredData = jsonData.filter(item => item.trip.routeId === trainId);
        setData(filteredData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [trainId]);

  useEffect(() => {
    if (data) {
      const grouped = data.reduce((acc, trip) => {
        if (Array.isArray(trip.stopTimeUpdate)) {
          trip.stopTimeUpdate.forEach(stop => {
            const stopName = getStopName(stop.stopId);
            if (!acc[stopName]) {
              acc[stopName] = [];
            }
            acc[stopName].push({ ...stop, routeId: trip.trip.routeId });
          });
        }
        return acc;
      }, {});

      setGroupedData(grouped);
    }
  }, [data, stopsData, getStopName]);

  function toggleStation(stationName) {
    setExpandedStation(expandedStation === stationName ? null : stationName);
  }

  return (
    <div style={styles.container}>
      <h1>Realtime Transit Data for {trainId} Train</h1>
      {Object.entries(groupedData).map(([stopName, trips], index) => (
        <div key={index} style={styles.stationCard}>
          <h2 onClick={() => toggleStation(stopName)} style={styles.stationName}>
            {stopName}
          </h2>
          {expandedStation === stopName && (
            <ul style={styles.tripList}>
              {trips.map((trip, idx) => (
                <li key={idx} style={styles.tripListItem}>
                  Arrival: {new Date(trip.arrival?.time * 1000).toLocaleTimeString()}, Departure: {new Date(trip.departure?.time * 1000).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  stationCard: {
    backgroundColor: '#f0f0f0',
    margin: '10px',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  tripList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  tripListItem: {
    backgroundColor: '#fff',
    margin: '5px 0',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  stationName: {
    cursor: 'pointer',
  }
};

export default TrainDetails;
