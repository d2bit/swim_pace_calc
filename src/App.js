import React, { useReducer } from 'react'
import { Grid, TextField } from '@material-ui/core'
import debounce from 'awesome-debounce-promise'
import { getPace, getTime, isValidTime } from './utils'

const INPUT_DEBOUNCE_TIME = 2000

const initialState = { time: '', distance: '', pace: '' }
function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIME':
      return { ...state, time: action.time, timeError: false }
    case 'SET_DISTANCE':
      return { ...state, distance: action.distance, distanceError: false }
    case 'SET_PACE':
      return { ...state, pace: action.pace, paceError: false }
    case 'SET_TIME_ERROR':
      return { ...state, timeError: true }
    case 'SET_DISTANCE_ERROR':
      return { ...state, distanceError: true }
    case 'SET_PACE_ERROR':
      return { ...state, paceError: true }
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
function setTimeError(time) {
  return {
    type: 'SET_TIME_ERROR',
    time,
  }
}
function setDistanceError(distance) {
  return {
    type: 'SET_DISTANCE_ERROR',
    distance,
  }
}
function setPaceError(pace) {
  return {
    type: 'SET_PACE_ERROR',
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
    const value = e.target.value.replace(',', ':')
    debouncedTimeChange(value)
  }
  function handleTimeBlur(e) {
    const value = e.target.value.replace(',', ':')
    if (value && !isValidTime(value)) {
      return dispatch(setTimeError(value))
    }
    dispatch(setTime(value))
    timeChangeSideEffects(value)
  }
  function timeChangeSideEffects(value) {
    if (!value || !isValidTime(value)) {
      return dispatch(setTimeError(value))
    }
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
    const value = e.target.value
    debouncedDistanceChange(value)
  }
  function handleDistanceBlur(e) {
    const value = e.target.value
    if ((value && isNaN(value)) || parseInt(value) <= 0) {
      return dispatch(setDistanceError(value))
    }
    dispatch(setDistance(value))
    distanceChangeSideEffects(value)
  }
  function distanceChangeSideEffects(value) {
    if (!value || isNaN(value) || parseInt(value) <= 0) {
      return dispatch(setDistanceError(value))
    }
    if (state.time) {
      const pace = getPace(state.time, value).for(100)
      dispatch(setPace(pace))
    } else if (state.pace) {
      const time = getTime(state.pace, value)
      dispatch(setTime(time))
    }
  }

  const debouncedPaceChange = debounce(
    paceChangeSideEffects,
    INPUT_DEBOUNCE_TIME
  )
  function handlePaceChange(e) {
    const value = e.target.value.replace(',', ':')
    debouncedPaceChange(value)
  }
  function handlePaceBlur(e) {
    const value = e.target.value.replace(',', ':')
    if (value && !isValidTime(value)) {
      return dispatch(setPaceError(value))
    }
    dispatch(setPace(value))
    paceChangeSideEffects(value)
  }
  function paceChangeSideEffects(value) {
    if (!isValidTime(value)) {
      return dispatch(setPaceError(value))
    }
    if (state.distance) {
      const time = getTime(value, state.distance)
      dispatch(setTime(time))
    }
  }

  return (
    <Grid container alignItems="center" justify="center" spacing={8}>
      <Grid item xs={10}>
        <TextField
          id="time"
          variant="outlined"
          margin="dense"
          fullWidth
          label="Time"
          placeholder="e.g. 12:10.9"
          inputProps={{ inputMode: 'numeric' }}
          key={state.time}
          defaultValue={state.time}
          error={state.timeError}
          onChange={handleTimeChange}
          onBlur={handleTimeBlur}
        />
      </Grid>
      <Grid item xs={10}>
        <TextField
          id="distance"
          variant="outlined"
          margin="dense"
          fullWidth
          label="Distance (in meters)"
          placeholder="e.g 800"
          inputProps={{ inputMode: 'numeric' }}
          key={state.distance}
          defaultValue={state.distance}
          error={state.distanceError}
          onChange={handleDistanceChange}
          onBlur={handleDistanceBlur}
        />
      </Grid>
      <Grid item xs={10}>
        <TextField
          id="pace"
          variant="outlined"
          margin="dense"
          fullWidth
          label="Pace (100m)"
          placeholder="e.g 1:26.3"
          inputProps={{ inputMode: 'numeric' }}
          key={state.pace}
          defaultValue={state.pace}
          error={state.paceError}
          onChange={handlePaceChange}
          onBlur={handlePaceBlur}
        />
      </Grid>
    </Grid>
  )
}

export default App
