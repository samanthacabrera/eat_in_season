import React from 'react';

const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

const DateFilter = ({ selectedSeason, onSelectSeason }) => {
  return (
    <div className="filter-section">
      <ul className="filter-list">
        {seasons.map((season) => (
          <li key={season} className="filter-item">
            <button
              className={`filter-button ${selectedSeason === season ? 'active' : ''}`}
              onClick={() => onSelectSeason(season)}
            >
              {season}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateFilter;
