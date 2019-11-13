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
export function usePrevious<T>(value: T, option: UsePreviousOption = {}): T | undefined {
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
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    if (isMounted) {
      func()
    } else {
      setMounted(true)
    }
  }, arr)
  useEffect(() => {
    return onDestroy
  }, [])
}

const useCreatedOpt = {
  /**
   * コンポーネントが破棄されるときに一度だけ発火する関数
   */
  onDestroy: () => {},
  /**
   * 指定されたonCreated関数の実行をawaitするかどうか
   */
  isAwait: false
}

/**
 * DOMがレンダリングされる前に一度だけ指定した関数を実行します
 * @param onCreated コンポーネントがマウントする前に一度だけ発火する関数。
 * @param onDestroy コンポーネントが破棄されるときに発火する関数
 * @param isAwait 指定されたonCreated関数の実行をawaitするかどうか
 */
export async function useCreated(onCreated: () => void, opt: Partial<typeof useCreatedOpt> = {}) {
  const _opt = {
    ...useCreatedOpt,
    ...opt
  }
  const [isCreated, setCreated] = useState(false)
  if (!isCreated) {
    setCreated(true)
    if (_opt.isAwait) {
      await onCreated()
    } else {
      onCreated()
    }
  }
  useEffect(() => {
    return _opt.onDestroy
  }, [])
}
