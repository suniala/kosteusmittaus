import { DependencyList, useEffect, useState } from 'react';
import { Either, Left, Right } from './either';
import { None, Option, Some } from './option';

export const annettu = <T>(arvo: T | undefined | null): T => {
    if (arvo == null) {
        throw Error('Arvo ei saa olla undefined tai null!')
    }
    return arvo as T
}

export const usePromise = <T>(p: () => Promise<T>, deps?: DependencyList) => {
    const [tulos, setTulos] = useState(None() as Option<Either<String, T>>)
    const [lataa, setLataa] = useState(true)

    useEffect(
        () => {
            async function odotaTulos() {
                try {
                    const tulos = await p()
                    setTulos(Some(Right(tulos)))
                } catch (e) {
                    console.log('virhe: ' + e)
                    setTulos(Some(Left(e as string)))
                }
                setLataa(false)
            }
            odotaTulos()
        },
        // eslint ei osaa analysoida riippuvuuksia oikein, koska lista on tämän funktion
        // näkökulmasta dynaaminen.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps
    )

    return { lataa, ehkaTulos: tulos }
}
