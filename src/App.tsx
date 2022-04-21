import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { usePromise } from './apu/hook';
import { annettu } from './apu/yleiset';
import { Kartta } from './Kartta';
import { KatselePistetta } from './KatselePistetta';
import { Lataava } from './Lataava';
import { noudaPisteet } from './palvelin/palvelin';
import { UusiPiste } from './UusiPiste';
import { Mittauspiste } from './yhteiset';

interface PisteenLisaysProps {
  onAloitaPisteenLisays: () => void
}

const PisteenLisays = (p: PisteenLisaysProps) => {
  useEffect(
    () => p.onAloitaPisteenLisays(),
    [])
  return (<div>Valitse piste kartalta.</div>)
}

const Aloitus = () => {
  const { lataa, ehkaTulos } = usePromise(() => noudaPisteet(), [])

  const Pisteet = (pisteet: Mittauspiste[]) => (
    <ul>
      {pisteet.map(piste => (
        <li key={piste.id}>
          <Link to={`/piste/${piste.id}`}>
            {piste.nimi}
          </Link>
        </li>))}
    </ul>
  )

  return (
    <div>
      <div>
        <Link to="/piste/uusi/valitse">
          Lisää piste
        </Link>
      </div>

      <div>
        <Lataava lataa={lataa} ehkaTulos={ehkaTulos} lapsi={Pisteet} />
      </div>
    </div>
  )
}

const KatselePistettaKaare = () => {
  const parametrit = useParams()
  return (
    <KatselePistetta valittuPiste={annettu(parametrit.id)} />
  )
}

const App = () => {
  const [pisteenLisays, setPisteenLisays] = useState(false)
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
            <Route path="/" element={<Aloitus />} />
            <Route path="piste">
              <Route path="uusi">
                <Route path="valitse" element={
                  <PisteenLisays
                    onAloitaPisteenLisays={() => { setPisteenLisays(true) }}
                  />
                } />
                <Route path=":x/:y" element={
                  <UusiPiste
                    onPisteTallennettu={(id) => {
                      navigate(`/piste/${id}`)
                    }}
                  />
                } />
              </Route>
              <Route path=":id" element={
                <KatselePistettaKaare />
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
          onValitsePiste={(piste) => { navigate(`/piste/${piste.id}`) }}
        />
      </div>
    </div>
  );
}

export default App;
