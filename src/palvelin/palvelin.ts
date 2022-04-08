import { fromPairs } from 'ramda'
import { optGet, Option, optIsDefined, Some } from '../option'
import { Mittauspiste } from '../yhteiset'

let idLaskuri = 1
const seuraavaId = (): string => {
    const id = `${idLaskuri}`
    idLaskuri = idLaskuri + 1
    return id
}

const pisteet: { [id: string]: Mittauspiste } = fromPairs(
    [
        {
            id: Some(seuraavaId()),
            koordinaatti: { x: 1, y: 2 },
            nimi: Some('eka')
        },
        {
            id: Some(seuraavaId()),
            koordinaatti: { x: 1, y: 2 },
            nimi: Some('toka')
        }
    ]
        .map(piste => [optGet(piste.id), piste])
)

export const noudaPisteet = (): Promise<Mittauspiste[]> => {
    console.log('noudaPisteet')
    const p: Promise<Mittauspiste[]> = new Promise(
        (resolve, reject) => setTimeout(
            () => {
                resolve(Object.values(pisteet))
            },
            2000)
    )
    return p
}

export const noudaPiste = (id: string): Promise<Mittauspiste> => {
    console.log('nouda: ' + id)
    const p: Promise<Mittauspiste> = new Promise(
        (resolve, reject) => setTimeout(
            () => {
                const ehkaPiste = Option(pisteet[id])
                if (optIsDefined(ehkaPiste)) {
                    resolve(optGet(ehkaPiste))
                } else {
                    reject(`Tuntematon mittauspiste: ${id}`)
                }
            },
            1000)
    )
    return p
}

export const tallennaPiste = (piste: Mittauspiste): Promise<string> => {
    const p: Promise<string> = new Promise(
        resolve => setTimeout(
            () => {
                const id = seuraavaId()

                pisteet[id] = {
                    ...piste,
                    id: Some(id)
                }
                resolve(id)
            },
            100)
    )
    return p
}