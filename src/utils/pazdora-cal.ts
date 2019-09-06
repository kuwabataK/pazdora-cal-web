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

type GenerateFieldOptions = {
  width?: number
  height?: number
  loopCnt?: number
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
 * 引数に指定したfieldに3つつながったドロップが無いことを確かめます
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
