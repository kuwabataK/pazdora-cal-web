export class Condition {
  color: DropColor = 'red'
  type: 'dropNum' | 'combo' = 'dropNum'
  ope: 'more' | 'less' = 'more'
  num = 3
}

export type DropColor = 'red' | 'blue' | 'green' | 'white' | 'black' | 'heart'
