import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const RouteDetailsScreen = () => {
  const { lineId } = useParams();
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(`/status/${lineId}`);
        setStations(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStations();
  }, [lineId]);

  const handleStationClick = (station) => {
    navigate(`/station/${station}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading stations.</p>;

  return (
    <div>
      <h1>Train Line {lineId} Route</h1>
      <ul>
        {stations.map((station, index) => (
          <li key={index} onClick={() => handleStationClick(station.route_id)}>
            <p>Route ID: {station.route_id}</p>
            <p>Location: {station.location}</p>
            <p>Status: {station.status}</p>
            <p>Last Update: {station.last_update}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default RouteDetailsScreen;
