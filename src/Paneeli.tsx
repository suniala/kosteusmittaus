import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { None, optCata, optGet, Option, Some } from './option';
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

export interface PaneeliProps {
  // valittuPiste: Option<Mittauspiste>
  pisteenLisays: boolean
  onLisaaPiste: () => void
}

export const Paneeli = (props: PaneeliProps) => {
  const { id } = useParams()
  // const paaa = optCata(props.valittuPiste,
  //   (piste) => {
  //     return optCata(piste.id,
  //       (id) => (<div>{optGet(piste.nimi)}</div>),
  //       () => (<Lomake onValmis={(tiedot) => props.onTallennaPiste({
  //         id: None(),
  //         koordinaatti: piste.koordinaatti,
  //         nimi: Some(tiedot.nimi)
  //       })}/>)
  //     )
  //   },
  //   () => null
  // )

  return (
    <div>
      Hups!
    </div>
  )
}
