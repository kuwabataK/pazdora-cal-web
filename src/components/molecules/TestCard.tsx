import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'
import {
  FormControl,
  InputLabel,
  Select,
  Theme,
  createStyles
} from '@material-ui/core'

const useStyles = makeStyles({
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
  }
})

const useSelectStyles = makeStyles((theme: Theme) =>
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

type Props = {
  condition: ConditionFactoryOptions
  setCondition: (newCondition: ConditionFactoryOptions) => void
}

export default function SimpleCard(props: Props) {
  const classes = useStyles()
  const selectClasses = useSelectStyles()

  const handleOptChange = (
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
  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={selectClasses.root} autoComplete="off">
          <FormControl className={selectClasses.formControl}>
            <InputLabel>ドロップの個数</InputLabel>
            <Select
              native
              value={props.condition.opt.dropNum}
              onChange={handleOptChange}
              inputProps={{
                name: 'dropNum',
                id: 'dropNum-simple'
              }}
            >
              <option value="" />
              {[...new Array(30)]
                .map((_val, i) => i + 1)
                .map(i => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  )
                })}
            </Select>
          </FormControl>
        </form>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
