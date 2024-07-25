import React, { useEffect, useState } from 'react';
import TypeFilter from './TypeFilter';
import DateFilter from './DateFilter';

const CropsList = ({ region }) => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');

  useEffect(() => {
    const fetchCropsForRegion = async (region) => {
      try {
        const response = await fetch('api/get_crops_for_region', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ region_name: region }),
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

    if (region) {
      fetchCropsForRegion(region);
    }
  }, [region]);

  useEffect(() => {
    filterCrops();
  }, [selectedType, selectedSeason, crops]);

  const filterCrops = () => {
    let filtered = crops;

    if (selectedType !== 'All') {
      filtered = filtered.filter((crop) => crop.type && crop.type.toLowerCase() === selectedType.toLowerCase());
    }

    if (selectedSeason !== 'All') {
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
    <div className="flex flex-col md:flex-row m-12 p-4">
      <div className="w-full md:w-1/5 pr-4 mb-4 md:mb-0">
        <TypeFilter selectedType={selectedType} onSelectType={setSelectedType} />
      </div>
      <div className="w-full md:w-3/5 overflow-auto">
        <h2 className="text-xl mb-4">Check out your local produce market for...</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <li
                key={crop.id}
                className="border border-2 border-orange-400 bg-orange-50 rounded-lg py-2 px-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-100"
              >
                <p className="text-xl text-gray-800">{crop.name}</p>
              </li>
            ))
          ) : (
            <p className="bg-slate-200 rounded-lg p-4 col-span-1 md:col-span-3">No crops found for the selected filters.</p>
          )}
        </ul>
      </div>
      <div className="w-full md:w-1/5 pl-4 mb-4 md:mb-0 hidden md:block">
        <DateFilter selectedSeason={selectedSeason} onSelectSeason={setSelectedSeason} />
      </div>
    </div>
  );
};

export default CropsList;
