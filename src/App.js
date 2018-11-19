import React, { useReducer } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import { getPace } from './utils'

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

  function handleTimeChange(ev) {
    const { value } = ev.target
    dispatch(setTime(value))
  }
  function handleDistanceChange(ev) {
    const { value } = ev.target
    dispatch(setDistance(value))
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
          onChange={handleTimeChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="distance"
          variant="outlined"
          margin="dense"
          label="Distance (in meters)"
          placeholder="e.g 800"
          onChange={handleDistanceChange}
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
