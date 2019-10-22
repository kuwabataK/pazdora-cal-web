/**
 * Tの部分型を返す
 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * オブジェクトの値の型のUnion Typeを返す
 */
export type ValueOf<T> = T[keyof T]
