import { usePromise } from './apu/hook'
import { Lataava } from './Lataava'
import { noudaPiste } from './palvelin/palvelin'
import { Mittauspiste } from './yhteiset'

const Tiedot = (piste: Mittauspiste) => (
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
      <Lataava lataa={lataa} ehkaTulos={ehkaTulos} lapsi={Tiedot} />
    </div>
  )
}
