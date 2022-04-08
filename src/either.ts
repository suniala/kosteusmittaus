import { annettu } from "./util"

export interface Either<L, R> {
    __l__: L | undefined
    __r__: R | undefined
}

export const eitherIsLeft = <L, R>(either: Either<L, R>): boolean => {
    return either.__l__ != null
}

export const eitherIsRight = <L, R>(either: Either<L, R>): boolean => {
    return either.__r__ != null
}

export const eitherGetLeft = <L, R>(either: Either<L, R>): L => {
    return annettu(either.__l__)
}

export const eitherGetRight = <L, R>(either: Either<L, R>): R => {
    return annettu(either.__r__)
}

export const eitherFold = <L, R, Z>(either: Either<L, R>, whenLeft: (left: L) => Z, whenRight: (right: R) => Z): Z => {
    if (eitherIsLeft(either)) {
        return whenLeft(eitherGetLeft(either))
    } else {
        return whenRight(eitherGetRight(either))
    }
}

export const Left = <L, R>(left: L): Either<L, R> => {
    return { __l__: left, __r__: undefined }
}

export const Right = <L, R>(right: R): Either<L, R> => {
    return { __l__: undefined, __r__: right }
}
