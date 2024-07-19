import React, { useEffect, useState } from 'react';
import CropCard from './CropCard';
import TypeFilter from './TypeFilter';
import DateFilter from './DateFilter';

const CropsList = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchCropsForLocation = async (latitude, longitude) => {
      try {
        const response = await fetch('api/get_crops', {
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
        setCrops(data.crops);
        setFilteredCrops(data.crops);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchCropsForLocation(latitude, longitude);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );
      } else {
        setError(new Error('Geolocation is not supported by this browser.'));
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    filterCrops();
  }, [selectedType, selectedSeason, crops]);

  const filterCrops = () => {
    let filtered = crops;

    if (selectedType !== 'All') {
      filtered = filtered.filter((crop) => crop.type === selectedType.toLowerCase());
    }

    if (selectedSeason) {
      filtered = filtered.filter((crop) => crop.season === selectedSeason.toLowerCase());
    }

    setFilteredCrops(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading crops: {error.message}</p>;
  }

  const containerStyle = {
    display: 'flex',
    padding: '1rem'
  };

  const filterSectionStyle = {
    width: '20%',
    paddingRight: '1rem'
  };

  const cropListStyle = {
    width: '60%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={filterSectionStyle}>
        <TypeFilter selectedType={selectedType} onSelectType={setSelectedType} />
      </div>
      <div style={cropListStyle}>
        {filteredCrops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
      <div style={filterSectionStyle}>
        <DateFilter selectedSeason={selectedSeason} onSelectSeason={setSelectedSeason} />
      </div>
    </div>
  );
};

export default CropsList;
