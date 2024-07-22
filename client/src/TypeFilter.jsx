import React from 'react';

const types = ['All', 'Vegetable', 'Fruit'];

const TypeFilter = ({ selectedType, onSelectType }) => {

  return (
    <>
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
    </>
  );
};

export default TypeFilter;
