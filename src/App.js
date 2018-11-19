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

  const debouncedTimeChange = debounce(handleTimeChange, INPUT_DEBOUNCE_TIME)
  const debouncedDistanceChange = debounce(
    handleDistanceChange,
    INPUT_DEBOUNCE_TIME
  )
  const debouncedPaceChange = debounce(handlePaceChange, INPUT_DEBOUNCE_TIME)
  function handleTimeChange(value) {
    dispatch(setTime(value))
    if (state.distance) {
      const pace = getPace(value, state.distance).for(100)
      dispatch(setPace(pace))
    }
  }
  function handleDistanceChange(value) {
    dispatch(setDistance(value))
    if (state.time) {
      const pace = getPace(state.time, value).for(100)
      dispatch(setPace(pace))
    }
  }
  function handlePaceChange(value) {
    dispatch(setPace(value))
  }
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
          onBlur={e => handleTimeChange(e.target.value)}
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
          onBlur={e => handleDistanceChange(e.target.value)}
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
          key={state.pace}
          defaultValue={state.pace}
          onChange={e => debouncedPaceChange(e.target.value)}
          onBlur={e => handlePaceChange(e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default App
