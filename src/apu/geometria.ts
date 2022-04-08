import { Coordinate } from "ol/coordinate"

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
