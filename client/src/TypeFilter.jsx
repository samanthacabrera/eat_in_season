import React from 'react';

const TypeFilter = ({ selectedType, onSelectType }) => {
  const types = ['All', 'Vegetables', 'Fruits'];

  return (
    <div className="filter-section">
      <ul>
        {types.map((type) => (
          <li key={type}>
            <button
              className={`filter-button ${selectedType === type ? 'active' : ''}`}
              onClick={() => onSelectType(type)}
            >
              {type}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeFilter;
