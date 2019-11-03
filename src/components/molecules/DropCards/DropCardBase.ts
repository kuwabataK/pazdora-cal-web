import {
  ConditionFactoryOptions,
  ConditionClasses
} from '../../../utils/pazdora-cal/Conditions/ConditionTypes'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { ValueOf } from '../../../utils/utilty-types'

export type DropCardProps<T extends keyof ConditionClasses> = {
  condition: ConditionFactoryOptions<T>
  setCondition: (newCondition: ConditionFactoryOptions<T>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteCondition?: (event: any) => void
}

/**
 * DropCard系のコンポーネントで共通で使用するメソッドを抽出
 * @param props
 */
export function generateDropFunc<T extends keyof ConditionClasses>(
  props: DropCardProps<T>
) {
  /**
   * セレクトボックスで選択した名前の条件を変更する
   * @param event セレクトボックスが変更された時に発火するイベント
   */
  function handleOptChange(
    name: keyof ConditionFactoryOptions<T>['opt'],
    value: ValueOf<ConditionFactoryOptions<T>['opt']>
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
      event: React.ChangeEvent<{ name?: string; value: unknown }>,
      isInt = false
    ) => {
      const value = isInt
        ? parseInt(event.target.value as string)
        : event.target.value
      props.setCondition({
        ...props.condition,
        opt: {
          ...props.condition.opt,
          [event.target.name as string]: value
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
    minWidth: 250,
    width: 500,
    maxWidth: 500,
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px'
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
    justifyContent: 'flex-center'
  },
  deleteContents: {
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
