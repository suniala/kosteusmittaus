export const annettu = <T>(arvo: T | undefined | null): T => {
    if (arvo == null) {
        throw Error('Arvo ei saa olla undefined tai null!')
    }
    return arvo as T
}