export abstract class BaseCondition {
  /**
   * 継承先のクラスコンストラクタの引数で指定されたobjを自分自身にマージするためのメソッド
   * 継承先のコンストラクタの中で呼び出す
   * @param self 自分自身。thisを指定する
   * @param obj マージするObject
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected readonly mergeToThis = <T extends any>(self: T, obj?: Partial<T>) => {
    if (!obj) return
    Object.keys(obj).forEach(key => {
      self[key] = obj[key]
    })
    return
  }

  /**
   * 自分自身のシャローコピーを返します
   */
  readonly clone = (): this => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { ...this, __proto__: (this as any).__proto__ }
  }
}
