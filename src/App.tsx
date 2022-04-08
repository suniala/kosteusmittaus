import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { Kartta } from './Kartta';
import { optGet, Some } from './option';
import { Paneeli } from './Paneeli';
import { annettu } from './util';
import { UusiPiste } from './UusiPiste';
import { Mittauspiste } from './yhteiset';

let idLaskuri = 1
const haeId = (): string => {
  const id = `${idLaskuri}`
  idLaskuri = idLaskuri + 1
  return id
}

interface PisteenLisaysProps {
  onAloitaPisteenLisays: () => void
}

const PisteenLisays = (p: PisteenLisaysProps) => {
  useEffect(() => p.onAloitaPisteenLisays())
  return (<div>Valitse piste kartalta.</div>)
}

function newFunction(pisteet: { [id: string]: Mittauspiste; }) {
  return <div>
    <Link to="/piste/uusi/valitse">
      Lisää piste
    </Link>

    {/* TODO: Näytä pisteet? */}
    {Object.keys(pisteet).length}
  </div>;
}

const PaneeliKaare = () => {
  const parametrit = useParams()
  return (
    <Paneeli valittuPiste={annettu(parametrit.id)} />
  )
}

const App = () => {
  const [pisteenLisays, setPisteenLisays] = useState(false)
  const [pisteet, setPisteet] = useState({} as { [id: string]: Mittauspiste })
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="juuri-vasen">
        <div>
          <nav>
            <Link to="/">Aloitus</Link>
          </nav>
        </div>
        <div>
          <Routes>
            <Route path="/" element={newFunction(pisteet)} />
            <Route path="piste">
              <Route path="uusi">
                <Route path="valitse" element={
                  <PisteenLisays
                    onAloitaPisteenLisays={() => setPisteenLisays(true)}
                  />
                } />
                <Route path=":x/:y" element={
                  <UusiPiste
                    onTallennaPiste={(p) => {
                      const id = haeId()
                      const uusiPiste = {
                        ...p,
                        'id': Some(id)
                      };
                      setPisteet({
                        ...pisteet,
                        [id]: uusiPiste
                      })
                      navigate(`/piste/${id}`)
                    }}
                  />
                } />
              </Route>
              <Route path=":id" element={
                <PaneeliKaare />
              }>
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
      <div className="juuri-oikea">
        <Kartta
          onLisaaPiste={(k) => {
            setPisteenLisays(false)
            navigate(`/piste/uusi/${k.x}/${k.y}`)
          }}
          pisteenLisays={pisteenLisays}
          onValitsePiste={(piste) => { navigate(`/piste/${optGet(piste.id)}`) }}
        />
      </div>
    </div>
  );
}

export default App;
