import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

export type DropCardProps = {
  condition: ConditionFactoryOptions
  setCondition: (newCondition: ConditionFactoryOptions) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteCondition?: (event: any) => void
}

/**
 * DropCard系のコンポーネントで共通で使用するメソッドを抽出
 * @param props
 */
export function generateDropFunc(props: DropCardProps) {
  /**
   * セレクトボックスで選択した名前の条件を変更する
   * @param event セレクトボックスが変更された時に発火するイベント
   */
  function handleOptChange<T extends keyof ConditionFactoryOptions['opt']>(
    name: T,
    value: ConditionFactoryOptions['opt'][T]
  ) {
    props.setCondition({
      ...props.condition,
      opt: {
        ...props.condition.opt,
        [name]: value
      }
    })
  }

  return {
    /**
     * カードの削除ボタンが押下された時に発火するメソッド
     */
    handleDelete: (event: any) => {
      if (!props.deleteCondition) return
      props.deleteCondition(event)
    },
    handleOptChange,
    /**
     * セレクトボックスで選択した名前の条件を変更する
     * @param event セレクトボックスが変更された時に発火するイベント
     */
    selectOpt: (
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

/**
 * カードのスタイル
 */
export const useCardStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 450
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardContents: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  deleteButton: {
    marginRight: 0
  }
})

/**
 * セレクトボックスのスタイル
 */
export const useSelectStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)
