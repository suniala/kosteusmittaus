import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { None, Some } from './option';
import { tallennaPiste } from './palvelin/palvelin';
import { annettu } from './util';
import { Koordinaatti, Mittauspiste } from './yhteiset';

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

const tallenna = async (koordinaatti: Koordinaatti, nimi: string): Promise<string> => {
  const piste: Mittauspiste = {
    id: None(),
    koordinaatti,
    nimi: Some(nimi)
  }
  const id = await tallennaPiste(piste)
  return id
}

export interface UusiPisteProps {
  onPisteTallennettu: (id: string) => void
}
export const UusiPiste = (props: UusiPisteProps) => {
  const { x, y } = useParams()

  return (
    <div>
      <Lomake onValmis={async (tiedot) => {
        const id = await tallenna(
          { x: parseFloat(annettu(x)), y: parseFloat(annettu(y)) },
          tiedot.nimi)
          props.onPisteTallennettu(id)
      }} />
    </div>
  )
}
