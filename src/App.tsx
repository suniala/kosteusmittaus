import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import { useEffect } from 'react';
import './App.css';

function Kartta() {
  useEffect(() => {
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'kartta',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })
  })

  return <div id="kartta"/>
}

function App() {
  return (
    <div className="App">
      <Kartta />
    </div>
  );
}

export default App;
