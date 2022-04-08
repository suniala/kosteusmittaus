import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { usePromise } from './apu/hook';
import { annettu } from './apu/yleiset';
import { eitherFold } from './functional/either';
import { optGet } from './functional/option';
import { Kartta } from './Kartta';
import { KatselePistetta } from './KatselePistetta';
import { noudaPisteet } from './palvelin/palvelin';
import { UusiPiste } from './UusiPiste';

interface PisteenLisaysProps {
  onAloitaPisteenLisays: () => void
}

const PisteenLisays = (p: PisteenLisaysProps) => {
  useEffect(() => p.onAloitaPisteenLisays())
  return (<div>Valitse piste kartalta.</div>)
}

const Aloitus = () => {
  const { lataa, ehkaTulos } = usePromise(() => noudaPisteet(), [])

  return (
    <div>
      <div>
        <Link to="/piste/uusi/valitse">
          Lisää piste
        </Link>
      </div>

      <div>
        {
          lataa
            ? (<span>lataa...</span>)
            : eitherFold(
              optGet(ehkaTulos),
              (virhe) => (<span>{virhe}</span>),
              (tulos) => (<ul>
                {tulos.map(piste => (
                  <li key={optGet(piste.id)}>
                    <Link to={`/piste/${optGet(piste.id)}`}>
                      {optGet(piste.nimi)}
                    </Link>
                  </li>))}
              </ul>)
            )
        }
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
                    onAloitaPisteenLisays={() => setPisteenLisays(true)}
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
          onValitsePiste={(piste) => { navigate(`/piste/${optGet(piste.id)}`) }}
        />
      </div>
    </div>
  );
}

export default App;
