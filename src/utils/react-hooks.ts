import { useRef, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

/**
 * 引数に指定した値を保存し、次のレンダリング時に返り値として所得することができます。
 * 初回レンダリング時の返り値は undefined になります
 *
 * @param value 保存する値
 * @param deepCopy trueを指定することで、lodashのcloneDeepを使ってdeepCopyした値を保存する
 *
 * @return preValue 前回保存された値
 */
export function usePrevious<T>(
  value: T,
  option: UsePreviousOption = {}
): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    const _value = option.deepCopy ? cloneDeep(value) : value
    ref.current = _value
  }, [value])

  return (ref.current as unknown) as T
}

interface UsePreviousOption {
  deepCopy?: boolean
}

/**
 * マウントのときに発火しないuseEffectを提供します
 * アンマウント時に実行する処理を指定することはできません
 * @param func 実行する処理
 * @param arr 監視対象の値の配列
 */
export function useWatch(
  func: () => void | undefined,
  arr: any[],
  onDestroy: () => void | undefined = () => {}
) {
  const [afterMountd, setMounted] = useState(false)
  useEffect(() => {
    if (afterMountd) {
      func()
    } else {
      setMounted(true)
    }
  }, arr)
  useEffect(() => {
    return onDestroy
  }, [])
}
