import React, { useState } from 'react';

function Location({ onRegionUpdate }) {
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState(null);
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch('api/save_location', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ latitude, longitude }),
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.region) {
              setRegion(`Location: ${data.region}`);
              onRegionUpdate(data.region); // Notify parent component of region update
            } else {
              setRegion('Location: Region not found');
            }
          } catch (error) {
            console.error('Error saving location:', error);
            setError('Error saving location');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Error getting location');
          setLoading(false);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} className="location-button">
        {loading ? 'Loading...' : region || 'Get My Location'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Location;
