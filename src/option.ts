export interface Option<T> {
    __value__: T | undefined
}

export const optIsDefined = <T>(option: Option<T>): boolean => {
    return option.__value__ != null
}

export const optGet = <T>(option: Option<T>): T => {
    const value = option.__value__
    if (value == null) {
        throw Error('Can\'t get from None!')
    }
    return value
}

export const optGetOrElse = <T>(option: Option<T>, f: () => T): T => {
    if (optIsDefined(option)) {
        return optGet(option)
    } else {
        return f()
    }
}

export const optMap = <T, U>(option: Option<T>, f: (t: T) => U): Option<U> => {
    if (optIsDefined(option)) {
        return Some(f(optGet(option)))
    } else {
        return None()
    }
}

export const optCata = <T, U>(
    option: Option<T>,
    whenDefined: (t: T) => U,
    whenNotDefined: () => U): U => {
    const newLocal = optMap(option, whenDefined)
    const newLocal_1 = optGetOrElse(
        newLocal,
        whenNotDefined)
    return newLocal_1
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Option = <T>(value: T | undefined | null): Option<T> => {
    if (value != null) {
        return Some(value)
    } else {
        return None()
    }
}

export const Some = <T>(value: T): Option<T> => {
    if (value == null) {
        throw Error('Can\'t be nullish!')
    }
    return { __value__: value }
}

export const None = <T>(): Option<T> => {
    return { __value__: undefined }
}
