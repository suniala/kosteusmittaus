export const defined = <T>(value: T | undefined | null): T => {
    if (value == null) {
        throw Error('Value must not be undefined or null!')
    }
    return value as T
}