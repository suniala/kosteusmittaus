import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { None, Some } from './option';
import { annettu } from './util';
import { Mittauspiste } from './yhteiset';

interface LomakeProps {
  onValmis: (tiedot: { nimi: string }) => void
}

const Lomake = (props: LomakeProps) => {
  const [nimi, setNimi] = useState('')

  const handleSubmit = (event: FormEvent) => {
    props.onValmis({ nimi })
    event.preventDefault();
  }

  const validi = nimi != null

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nimi:
        <input
          type="text"
          value={nimi}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNimi(e.target.value)} />
      </label>
      <input type="submit" value="Tallenna" disabled={!validi} />
    </form>
  )
}

export interface UusiPisteProps {
  onTallennaPiste: (p: Mittauspiste) => void
}

export const UusiPiste = (props: UusiPisteProps) => {
  const { x, y } = useParams()

  return (
    <div>
      <Lomake onValmis={(tiedot) => props.onTallennaPiste({
        id: None(),
        koordinaatti: { x: parseFloat(annettu(x)), y: parseFloat(annettu(y)) },
        nimi: Some(tiedot.nimi)
      })} />
    </div>
  )
}
