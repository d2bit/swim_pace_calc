import React, { useReducer } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import debounce from 'awesome-debounce-promise'
import { getPace } from './utils'

const INPUT_DEBOUNCE_TIME = 2000

const initialState = { time: '', distance: '', pace: '' }
function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIME':
      return { ...state, time: action.time }
    case 'SET_DISTANCE':
      return { ...state, distance: action.distance }
    case 'SET_PACE':
      return { ...state, pace: action.pace }
    default:
      return state
  }
}
function setTime(time) {
  return {
    type: 'SET_TIME',
    time,
  }
}
function setDistance(distance) {
  return {
    type: 'SET_DISTANCE',
    distance,
  }
}
function setPace(pace) {
  return {
    type: 'SET_PACE',
    pace,
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const debouncedTimeChange = debounce(
    async value => await dispatch(setTime(value)),
    INPUT_DEBOUNCE_TIME
  )
  const debouncedDistanceChange = debounce(
    async value => await dispatch(setDistance(value)),
    INPUT_DEBOUNCE_TIME
  )
  function handleCalculate() {
    const { time, distance } = state
    const pace = getPace(time, distance).for(100)
    dispatch(setPace(pace))
  }

  return (
    <Grid container alignItems="center" spacing={8}>
      <Grid item xs={6}>
        <TextField
          id="time"
          variant="outlined"
          margin="dense"
          label="Time"
          placeholder="e.g. 12:10.9"
          onChange={e => debouncedTimeChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="distance"
          variant="outlined"
          margin="dense"
          label="Distance (in meters)"
          placeholder="e.g 800"
          onChange={e => debouncedDistanceChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleCalculate}
        >
          Calculate
        </Button>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="pace"
          variant="outlined"
          margin="dense"
          label="Pace (100m)"
          placeholder="e.g 1:26.3"
          value={state.pace}
        />
      </Grid>
    </Grid>
  )
}

export default App
