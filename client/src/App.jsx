import Location from './Location';
import CropsList from './CropsList';
import Footer from './Footer';
import '././App.css'

function App() {

  return (
    <>
    <section className="flex align-center justify-between m-12 p-4">
      <h1 className="text-4xl">eat by season</h1>
      <Location />
    </section>

    <section>
      <CropsList />
      <Footer />
    </section>
    </>
  )
}

export default App;
