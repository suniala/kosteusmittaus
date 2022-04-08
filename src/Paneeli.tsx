import { eitherFold } from './either'
import { optGet } from './option'
import { noudaPiste } from './palvelin/palvelin'
import { usePromise } from './util'
import { Mittauspiste } from './yhteiset'

interface TiedotProps {
  piste: Mittauspiste
}
const Tiedot = ({ piste }: TiedotProps) => (
  <ul>
    <li>{optGet(piste.id)}</li>
    <li>{optGet(piste.nimi)}</li>
  </ul>
)

export interface PaneeliProps {
  valittuPiste: string
}

export const Paneeli = (props: PaneeliProps) => {
  const { lataa, ehkaTulos } = usePromise(() => noudaPiste(props.valittuPiste), [props.valittuPiste])

  return (
    <div>
      {
        lataa
          ? (<span>lataa</span>)
          : eitherFold(
            optGet(ehkaTulos),
            virhe => (<span>virhe: {virhe}</span>),
            (tulos) => (<Tiedot piste={tulos} />)
          )
      }
    </div>
  )
}
