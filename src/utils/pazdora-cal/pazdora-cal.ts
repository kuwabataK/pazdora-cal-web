import { Condition } from './Condition'
export type GenerateFieldOptions = {
  width?: number
  height?: number
  loopCnt?: number
}

export type GenerateFieldStatsReturn = {
  red: number
  blue: number
  green: number
  white: number
  black: number
  heart: number
}

export type CalcReturn = {
  total: number
  rate: number
  correct: number
}

/**
 * 引数に指定した盤面の配列と、条件から非欠損率の計算結果を返す
 * @param condition
 * @param fields
 */
export function calc(
  condition: Condition[][],
  fields: GenerateFieldStatsReturn[]
): CalcReturn {
  const total = fields.length

  const correct = fields.filter(f => {
    for (const cond of condition) {
      for (let i = 0; i < cond.length; i++) {
        if (pazFilter(f, cond[i])) {
          if (i + 1 === cond.length) return true
          continue
        } else {
          break
        }
      }
    }
    return false
  }).length

  return {
    total,
    correct,
    rate: (correct / total) * 100
  }
}

/**
 * 引数に指定した条件に盤面があっていた場合、trueを返す
 *
 * @param field
 * @param condition
 */
function pazFilter(field: GenerateFieldStatsReturn, condition: Condition) {
  switch (condition.type) {
    case 'dropNum':
      switch (condition.ope) {
        case 'more':
          return field[condition.color] >= condition.num
        case 'less':
          return field[condition.color] <= condition.num
        default:
          return true
      }
    case 'combo':
      switch (condition.ope) {
        case 'more':
          return (
            Object.values(field).reduce((acc, cur) => {
              return acc + Math.floor(cur / 3)
            }, 0) >= condition.num
          )
        case 'less':
          return (
            Object.values(field).reduce((acc, cur) => {
              return acc + Math.floor(cur / 3)
            }, 0) <= condition.num
          )
        default:
          return true
      }
    default:
      return true
  }
}

/**
 * パズドラの盤面を生成して、各色のドロップがどれだけ存在するかを返す
 * @param option
 */
export function generateFieldStats(
  option: GenerateFieldOptions = {}
): GenerateFieldStatsReturn[] {
  const width = option.width || 6
  const height = option.height || 5
  const loopCnt = option.loopCnt || 100000

  const fields = []

  for (let i = 0; i < loopCnt; i++) {
    const field = generateField(width, height)
    if (isValidFiled(field)) {
      const flatField = field.flat()
      const stat = {
        red: flatField.filter(f => f === 0).length,
        blue: flatField.filter(f => f === 1).length,
        green: flatField.filter(f => f === 2).length,
        white: flatField.filter(f => f === 3).length,
        black: flatField.filter(f => f === 4).length,
        heart: flatField.filter(f => f === 5).length
      }
      fields.push(stat)
    }
  }

  return fields
}

/**
 * パズドラの盤面のリストを作成して返す
 * @param option
 */
export function generateFields(
  option: GenerateFieldOptions = {}
): number[][][] {
  const width = option.width || 6
  const height = option.height || 5
  const loopCnt = option.loopCnt || 100000

  const fields = []

  for (let i = 0; i < loopCnt; i++) {
    const field = generateField(width, height)
    if (isValidFiled(field)) fields.push(field)
  }

  return fields
}

/**
 * 指定した大きさの盤面を作成する
 *
 * @param width 横のドロップの数
 * @param height 縦のドロップの数
 */
function generateField(width = 6, height = 5): number[][] {
  const field: number[][] = []
  for (let i = 0; i < height; i++) {
    const innerArr = []
    for (let j = 0; j < width; j++) {
      innerArr.push(Math.floor(Math.random() * 6))
    }
    field[i] = innerArr
  }
  return field
}

/**
 * 引数に指定したfieldに3つつながったドロップが無いことを確かめる
 * ドロップがない場合はtrueが返る
 * @param field
 */
function isValidFiled(field: number[][]) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length - 2; j++) {
      if (field[i][j] === field[i][j + 1] && field[i][j] === field[i][j + 2])
        return false
    }
  }

  for (let i = 0; i < field.length - 2; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === field[i + 1][j] && field[i][j] === field[i + 2][j])
        return false
    }
  }
  return true
}
