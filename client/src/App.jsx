import Location from './Location';
import CropsList from './CropsList';
import '././App.css'

function App() {

  return (
    <div>
      <h1 className="text-4xl">eat by season</h1>
      <Location />
      <CropsList/>
    </div>
  );
}

export default App;
