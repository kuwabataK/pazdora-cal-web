import * as React from 'react'
import DropCard from '../molecules/DropCard'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'
import PazButton from '../atoms/PazButton'
import store from '../../store/store'
import { observer } from 'mobx-react'
import {
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'
import { useBanmen } from '../../custom-hook/pazhooks'
import ComboCard from '../molecules/ComboCard'
import MultiColorCard from '../molecules/MultiColorCard'

/**
 * セレクトボックスのスタイル
 */
const useSelectStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'nowrap'
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

/**
 * ドロップ条件を追加したときの初期値
 */
const initDropCond = (): ConditionFactoryOptions => ({
  type: 'Drop',
  opt: {
    color: 'red',
    dropNum: 3,
    ope: 'more'
  }
})

/**
 * コンボ条件を追加したときの初期値
 */
const initComboCond = (): ConditionFactoryOptions => ({
  type: 'Combo',
  opt: {
    comboNum: 7,
    dropNum: 3,
    ope: 'more'
  }
})

/**
 * 多色条件を追加したときの初期値
 */
const initMultiColorCond = (): ConditionFactoryOptions => ({
  type: 'MultiColor',
  opt: {
    dropNum: 3,
    includeDrops: ['red'],
    dropColorNum: 1,
    ope: 'more'
  }
})

const PazdoraCalTemplate = observer(() => {
  /**
   * ページ遷移時にスレッドを作成しておく
   */
  React.useEffect(() => {
    store.pazdoraCalStore.pazCalControllStore.createThread(8)
    return () => store.pazdoraCalStore.pazCalControllStore.dispose()
  }, [])

  const selectClasses = useSelectStyles()

  const pazStore = store.pazdoraCalStore
  const conditions = pazStore.conditions

  const { banmen, setBanmen } = useBanmen(pazStore)

  const setCondition = (
    index: number,
    newcondition: ConditionFactoryOptions
  ) => {
    pazStore.setCondition(index, newcondition)
  }

  /**
   * Dropカードを作成する
   */
  const createDropCond = () => {
    pazStore.addCondition(initDropCond())
  }

  /**
   * コンボカードを作成する
   */
  const createComboCond = () => {
    pazStore.addCondition(initComboCond())
  }

  const createMultiCond = () => {
    pazStore.addCondition(initMultiColorCond())
  }

  /**
   * カードを削除する
   * @param index
   */
  const deleteCond = (index: number) => {
    pazStore.deleteCondition(index)
  }

  return (
    <div>
      <div>
        <h3>条件を満たす確率: {pazStore.rate}%</h3>
      </div>
      <div>
        <form className={selectClasses.root} autoComplete="off">
          <FormControl className={selectClasses.formControl}>
            <InputLabel>盤面</InputLabel>
            <Select
              native
              value={banmen}
              onChange={event =>
                setBanmen(event.target.value as '56盤面' | '76盤面')
              }
              inputProps={{
                name: 'banmen',
                id: 'drop-color-simple'
              }}
            >
              <option value="56盤面">56盤面</option>
              <option value="76盤面">76盤面</option>
            </Select>
          </FormControl>
          <PazButton
            btnName="計算を実行"
            onClick={() => pazStore.calcParallelInStoreCondition()}
          ></PazButton>
        </form>
      </div>
      <div>
        <PazButton
          btnName="ドロップ条件を追加"
          onClick={createDropCond}
        ></PazButton>
        <PazButton
          btnName="コンボ条件を追加"
          onClick={createComboCond}
        ></PazButton>
        <PazButton
          btnName="多色条件を追加"
          onClick={createMultiCond}
        ></PazButton>
      </div>
      {conditions.map((cond, i) => {
        if (cond.type === 'Drop') {
          return (
            <DropCard
              key={i}
              condition={cond}
              setCondition={newCond => setCondition(i, newCond)}
              deleteCondition={() => deleteCond(i)}
            ></DropCard>
          )
        } else if (cond.type === 'Combo') {
          return (
            <ComboCard
              key={i}
              condition={cond}
              setCondition={newCond => setCondition(i, newCond)}
              deleteCondition={() => deleteCond(i)}
            ></ComboCard>
          )
        } else if (cond.type === 'MultiColor') {
          return (
            <MultiColorCard
              key={i}
              condition={cond}
              setCondition={newCond => setCondition(i, newCond)}
              deleteCondition={() => deleteCond(i)}
            ></MultiColorCard>
          )
        }
      })}
    </div>
  )
})
export default PazdoraCalTemplate
