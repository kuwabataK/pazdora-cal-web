import uuidv4 from 'uuid'

/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IDisposable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispose: () => any
}

export function using<T extends IDisposable, K>(resource: T, func: (resource: T) => K) {
  try {
    return func(resource)
  } finally {
    resource.dispose()
  }
}

/**
 * 引数にいれた文字列の配列をkeyとvalueにもつオブジェクトを返す
 * Enumとして利用できる
 */
export function generateEnum<T extends string>(strArr: T[]): { [K in T]: K } {
  return strArr.reduce((acc, cur) => {
    acc[cur] = cur
    return acc
  }, Object.create(null))
}

/**
 * 引数に指定した名前のリストに対して、一意なIDを生成します
 * @param {string[]} name
 */
export function generateUUIDs<T extends string>(name: T[]): { [K in T]: string } {
  return name.reduce((acc, cur) => {
    acc[cur] = uuidv4()
    return acc
  }, Object.create(null))
}
