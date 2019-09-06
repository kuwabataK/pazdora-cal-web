/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IDisposable {
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
