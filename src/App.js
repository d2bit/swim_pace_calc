import React, { useReducer } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import debounce from 'awesome-debounce-promise'
import { getPace, getTime } from './utils'

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
    timeChangeSideEffects,
    INPUT_DEBOUNCE_TIME
  )
  function handleTimeChange(e) {
    const { value } = e.target
    debouncedTimeChange(value)
  }
  function handleTimeBlur(e) {
    const { value } = e.target
    dispatch(setTime(value))
    timeChangeSideEffects(value)
  }
  function timeChangeSideEffects(value) {
    if (state.distance) {
      const pace = getPace(value, state.distance).for(100)
      dispatch(setPace(pace))
    }
  }

  const debouncedDistanceChange = debounce(
    distanceChangeSideEffects,
    INPUT_DEBOUNCE_TIME
  )
  function handleDistanceChange(e) {
    const { value } = e.target
    debouncedDistanceChange(value)
  }
  function handleDistanceBlur(e) {
    const { value } = e.target
    dispatch(setDistance(value))
    distanceChangeSideEffects(value)
  }
  function distanceChangeSideEffects(value) {
    if (state.time) {
      const pace = getPace(state.time, value).for(100)
      dispatch(setPace(pace))
    }
  }

  const debouncedPaceChange = debounce(
    paceChangeSideEffects,
    INPUT_DEBOUNCE_TIME
  )
  function handlePaceChange(e) {
    const { value } = e.target
    debouncedPaceChange(value)
  }
  function handlePaceBlur(e) {
    const { value } = e.target
    dispatch(setPace(value))
    paceChangeSideEffects(value)
  }
  function paceChangeSideEffects(value) {
    if (state.distance) {
      const time = getTime(value, state.distance)
      dispatch(setTime(time))
    }
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
          inputProps={{ inputMode: 'numeric' }}
          key={state.time}
          defaultValue={state.time}
          onChange={handleTimeChange}
          onBlur={handleTimeBlur}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="distance"
          variant="outlined"
          margin="dense"
          label="Distance (in meters)"
          placeholder="e.g 800"
          inputProps={{ inputMode: 'numeric' }}
          key={state.distance}
          defaultValue={state.distance}
          onChange={handleDistanceChange}
          onBlur={handleDistanceBlur}
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
          inputProps={{ inputMode: 'numeric' }}
          key={state.pace}
          defaultValue={state.pace}
          onChange={handlePaceChange}
          onBlur={handlePaceBlur}
        />
      </Grid>
    </Grid>
  )
}

export default App
