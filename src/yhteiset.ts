import { Koordinaatti } from "./apu/geometria"
import type { Option } from './functional/option'

// TODO: Tästä voisi poistaa Option-tyyppejä, jos pisteen lisäyksessä ei 
// käytettäisi tätä tyyppiä.
export interface Mittauspiste {
    id: Option<string>
    koordinaatti: Koordinaatti
    nimi: Option<string>
}
