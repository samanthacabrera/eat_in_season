import { useState, useEffect } from 'react';
import supabase from './supabaseClient'; 
import Location from './Location';

function App() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    async function getCrops() {
      try {
        const { data: crops, error } = await supabase.from('crops').select();

        if (error) {
          throw error;
        }

        if (crops.length > 0) {
          setCrops(crops);
        }
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    }

    getCrops();
  }, []);

  return (
    <div>
      <h1>eat by season</h1>
      <ul>
        {crops.map((crop) => (
          <li key={crop.id}>{crop.name}</li> // Assuming `id` and `name` are fields in your `crops` table
        ))}
      </ul>
      <Location />
    </div>
  );
}

export default App;
