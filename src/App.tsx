import 'ol/ol.css';
import { useState } from 'react';
import './App.css';
import { Kartta } from './Kartta';
import { None, optGetOrElse, Option, optMap, Some } from './option';
import { Mittauspiste } from './yhteiset';

interface PaneeliProps {
  valittuPiste: Option<Mittauspiste>
  pisteenLisays: boolean
  onLisaaPiste: () => void
}
const Paneeli = (props: PaneeliProps) => {
  const pistenimi = optGetOrElse(
    optMap(props.valittuPiste, (vp) => vp.nimi),
    () => "-");
  return (
    <div>
      <div>
        <button disabled={props.pisteenLisays} onClick={() => props.onLisaaPiste()}>
          Lisaa piste
        </button>
      </div>
      <div>Valittu piste: {pistenimi}</div>
    </div>
  )
}

const App = () => {
  const [pisteenLisays, setPisteenLisays] = useState(false)
  const [valittuPiste, setValittuPiste] = useState(None() as Option<Mittauspiste>)

  return (
    <div className="App">
      <div className="juuri-vasen">
        <Paneeli
          valittuPiste={valittuPiste}
          pisteenLisays={pisteenLisays}
          onLisaaPiste={() => setPisteenLisays(true)}
        />
      </div>
      <div className="juuri-oikea">
        <Kartta
          onLisaaPiste={() => {
            setPisteenLisays(false)
          }}
          pisteenLisays={pisteenLisays}
          onValitsePiste={(piste) => setValittuPiste(Some(piste))} />
      </div>
    </div>
  );
}

export default App;
