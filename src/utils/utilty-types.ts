/**
 * オブジェクトの値の型のUnion Typeを返す
 */
export type ValueOf<T> = T[keyof T]
