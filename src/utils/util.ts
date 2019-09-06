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
