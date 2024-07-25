import React, { useState } from 'react';
import Location from './Location';
import CropsList from './CropsList';
import Footer from './Footer';
import '././App.css'

function App() {

  const [region, setRegion] = useState(null);

  return (
    <>
      <section className="flex align-center justify-between m-12 p-4">
        <div className="flex items-center">
          <img 
            src="./carrot.png" 
            alt="carrot" 
            className="w-16 h-16 object-cover"
          />
          <h1 className="text-4xl">eat by season</h1>

        </div>
        <Location onRegionUpdate={setRegion} />
      </section>
      {region && <CropsList region={region} />}
      <Footer />

    </>
  )
}

export default App;
