import React from 'react';

const CropCard = ({ crop }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <img className="w-full" src={crop.imageUrl} alt={crop.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{crop.name}</div>
        <p className="text-gray-700 text-base">
          {crop.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
          {crop.type}
        </span>
        <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2">
          {crop.season}
        </span>
      </div>
    </div>
  );
}

export default CropCard;
