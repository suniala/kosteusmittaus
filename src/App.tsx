import { useState } from 'react';
import './App.css';
import { Kartta } from './Kartta';
import { None, Option, Some } from './option';
import { Paneeli } from './Paneeli';
import { Koordinaatti, Mittauspiste } from './yhteiset';

let idLaskuri = 1
const haeId = (): string => {
  const id = `${idLaskuri}`
  idLaskuri = idLaskuri + 1
  return id
}

const App = () => {
  const [pisteenLisays, setPisteenLisays] = useState(false)
  const [valittuPiste, setValittuPiste] = useState(None() as Option<Mittauspiste>)
  const [pisteet, setPisteet] = useState({} as { [id: string]: Mittauspiste })

  return (
    <div className="App">
      <div className="juuri-vasen">
        <Paneeli
          valittuPiste={valittuPiste}
          pisteenLisays={pisteenLisays}
          onLisaaPiste={() => setPisteenLisays(true)}
          onTallennaPiste={(p) => {
            const id = haeId()
            setPisteet({
              ...pisteet,
              [id]: {
                ...p,
                'id': Some(id)
              }
            })
          }}
        />
        <div>
          {/* TODO: Näytä pisteet? */}
          {Object.keys(pisteet).length}
        </div>
      </div>
      <div className="juuri-oikea">
        <Kartta
          onLisaaPiste={(k: Koordinaatti) => {
            setPisteenLisays(false)
            setValittuPiste(Some({
              id: None(),
              koordinaatti: k,
              nimi: None()
            }))
          }}
          pisteenLisays={pisteenLisays}
          onValitsePiste={(piste) => setValittuPiste(Some(piste))} />
      </div>
    </div>
  );
}

export default App;
