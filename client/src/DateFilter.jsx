import React from 'react';

const seasons = ['All','Winter', 'Spring', 'Summer', 'Fall'];

const DateFilter = ({ selectedSeason, onSelectSeason }) => {
  return (
    <>
      <ul>
        {seasons.map((season) => (
          <li key={season}>
            <button
              className={`filter-button ${selectedSeason === season ? 'active' : ''}`}
              onClick={() => onSelectSeason(season)}
            >
              {season}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DateFilter;
