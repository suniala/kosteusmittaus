import { Either, eitherFold } from './functional/either'
import { optGet, Option } from './functional/option'

export interface LataavaProps<T> {
  lataa: boolean
  ehkaTulos: Option<Either<string, T>>
  lapsi: (tulos: T) => JSX.Element
}

export function Lataava<T>({ lataa, ehkaTulos, lapsi }: LataavaProps<T>) {
  const komponentti = lataa
    ? (<span>lataa</span>)
    : eitherFold(
      optGet(ehkaTulos),
      virhe => (<span>virhe: {virhe}</span>),
      (tulos) => (lapsi(tulos))
    )
  return (
    <div>
      {komponentti}
    </div>
  )
}
