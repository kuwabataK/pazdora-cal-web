/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IDisposable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispose: () => any
}

export function using<T extends IDisposable, K>(
  resource: T,
  func: (resource: T) => K
) {
  try {
    return func(resource)
  } finally {
    resource.dispose()
  }
}

/**
 * 引数にいれた文字列の配列をkeyとvalueにもつオブジェクトを返す
 */
export function generateEnum<T extends string>(strArr: T[]): { [K in T]: K } {
  return strArr.reduce((acc, cur) => {
    acc[cur] = cur
    return acc
  }, Object.create(null))
}
