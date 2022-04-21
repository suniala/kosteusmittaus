import { Either, eitherFold } from './functional/either'
import { optGet, Option } from './functional/option'

export interface LataavaProps<T> {
  lataa: boolean
  ehkaTulos: Option<Either<string, T>>
  luoLapsi: (tulos: T) => JSX.Element
}

export function Lataava1<T>({ lataa, ehkaTulos, luoLapsi }: LataavaProps<T>) {
  const komponentti = lataa
    ? (<span>lataa</span>)
    : eitherFold(
      optGet(ehkaTulos),
      virhe => (<span>virhe: {virhe}</span>),
      (tulos) => (luoLapsi(tulos))
    )
  return (
    <div>
      {
        komponentti
      }
    </div>
  )
}

export interface Lataava2Props<T> {
  lataa: boolean
  ehkaTulos: Option<Either<string, T>>
  children: (tulos: T) => JSX.Element
}

export function Lataava2<T>({ lataa, ehkaTulos, children }: Lataava2Props<T>) {
  const komponentti = lataa
    ? (<span>lataa</span>)
    : eitherFold(
      optGet(ehkaTulos),
      virhe => (<span>virhe: {virhe}</span>),
      (tulos) => (children(tulos))
    )
  return (
    <div>
      {
        komponentti
      }
    </div>
  )
}
