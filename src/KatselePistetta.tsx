import { usePromise } from './apu/hook'
import { Lataava1, Lataava2 } from './Lataava'
import { noudaPiste } from './palvelin/palvelin'
import { Mittauspiste } from './yhteiset'

interface Tiedot1Props {
  piste: Mittauspiste
}

const Tiedot1 = ({ piste }: Tiedot1Props) => (
  <ul>
    <li>{piste.id}</li>
    <li>{piste.nimi}</li>
  </ul>
)

const Tiedot2 = (piste: Mittauspiste) => (
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
      <span>Tässä on kokeilumielessä muutama erilainen tapa käyttää Lataava-komponettia</span>
      <div>
        <Lataava1 lataa={lataa} ehkaTulos={ehkaTulos} luoLapsi={(tulos: Mittauspiste) => (<Tiedot1 piste={tulos} />)} />
      </div>
      <div>
        <Lataava2 lataa={lataa} ehkaTulos={ehkaTulos}>
          {tulos => (<Tiedot1 piste={tulos} />)}
        </Lataava2>
      </div>
      <div>
        <Lataava2 lataa={lataa} ehkaTulos={ehkaTulos}>
          {Tiedot2}
        </Lataava2>
      </div>
      <div>
        <Lataava2 lataa={lataa} ehkaTulos={ehkaTulos} children={Tiedot2} />
      </div>
    </div>
  )
}
