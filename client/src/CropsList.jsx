import React, { useEffect, useState } from 'react';
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
      filtered = filtered.filter((crop) => crop.type && crop.type.toLowerCase() === selectedType.toLowerCase());
    }

    if (selectedSeason) {
      filtered = filtered.filter((crop) => crop.season && crop.season.toLowerCase() === selectedSeason.toLowerCase());
    }

    setFilteredCrops(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading crops: {error.message}</p>;
  }

  return (
    <div className="flex m-12 p-4">
      <div className="w-1/5 pr-4">
        <TypeFilter selectedType={selectedType} onSelectType={setSelectedType} />
      </div>
      <ul className="w-3/5 flex flex-col justify-center items-center space-y-8">
        <h2 className="text-xl">Check out your local produce market for...</h2>
        {filteredCrops.map((crop) => (
          <li key={crop.id} className="w-fit border border-2 border-orange-400 bg-orange-50 rounded-lg py-2 px-2 list-none">
            <p className="text-xl text-gray-800">{crop.name}</p>
          </li>
        ))}
      </ul>
      <div className="w-1/5 pl-4">
        <DateFilter selectedSeason={selectedSeason} onSelectSeason={setSelectedSeason} />
      </div>
    </div>
  );
};

export default CropsList;
