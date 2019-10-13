import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'

export type DropCardProps = {
  condition: ConditionFactoryOptions
  setCondition: (newCondition: ConditionFactoryOptions) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteCondition?: (event: any) => void
}

export function generateDropFunc(props: DropCardProps) {
  return {
    /**
     * カードの削除ボタンが押下された時に発火するメソッド
     */
    handleDelete: (event: any) => {
      if (!props.deleteCondition) return
      props.deleteCondition(event)
    },
    /**
     * 指定した名前の条件を変更する
     * @param event セレクトボックスが変更された時に発火するイベント
     */
    handleOptChange: (
      event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
      props.setCondition({
        ...props.condition,
        opt: {
          ...props.condition.opt,
          [event.target.name as string]: event.target.value
        }
      })
    }
  }
}
