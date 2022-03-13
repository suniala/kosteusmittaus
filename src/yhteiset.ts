import { Coordinate } from "ol/coordinate"
import { Option } from "./option"

// TODO: Tästä voisi poistaa Option-tyyppejä, jos pisteen lisäyksessä ei 
// käytettäisi tätä tyyppiä.
export interface Mittauspiste {
    id: Option<string>
    koordinaatti: Koordinaatti
    nimi: Option<string>
}

export interface Koordinaatti {
    x: number
    y: number
}

export const muunnaOlKoordinaatti = (ol: Coordinate): Koordinaatti => {
    return {
        x: ol[0],
        y: ol[1]
    }
}

export const muunnaKoordinaattiOl = (k: Koordinaatti): Coordinate => {
    return [k.x, k.y]
}
