import { eitherFold } from './functional/either'
import { optGet } from './functional/option'
import { noudaPiste } from './palvelin/palvelin'
import { usePromise } from './apu/hook'
import { Mittauspiste } from './yhteiset'

interface TiedotProps {
  piste: Mittauspiste
}
const Tiedot = ({ piste }: TiedotProps) => (
  <ul>
    <li>{piste.id}</li>
    <li>{piste.nimi}</li>
  </ul>
)

export interface KatselePistettaProps {
  valittuPiste: string
}

export const KatselePistetta = (props: KatselePistettaProps) => {
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
