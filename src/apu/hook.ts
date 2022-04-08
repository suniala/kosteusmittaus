import { DependencyList, useEffect, useState } from 'react';
import { Either, Left, Right } from '../functional/either';
import { None, Option, Some } from '../functional/option';

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
