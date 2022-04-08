import { optGet, Option, optIsDefined, Some } from '../option'
import { Mittauspiste } from '../yhteiset'

const pisteet: { [id: string]: Mittauspiste } = {
    '1': {
        id: Some('1'),
        koordinaatti: { x: 1, y: 2 },
        nimi: Some('eka')
    },
    '2': {
        id: Some('2'),
        koordinaatti: { x: 1, y: 2 },
        nimi: Some('toka')
    }
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

export const tallennaPiste = (piste: Mittauspiste): Promise<void> => {
    const p: Promise<void> = new Promise(
        resolve => setTimeout(
            () => {
                pisteet[optGet(piste.id)] = piste
                resolve()
            },
            100)
    )
    return p
}