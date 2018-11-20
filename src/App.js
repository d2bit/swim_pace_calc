import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import debounce from 'awesome-debounce-promise'
import useInputs from './useInputs'
import { getPace, getTime, isValidTime, formatTime } from './utils'

const INPUT_DEBOUNCE_TIME = 2000

function App() {
  const {
    time,
    setTime,
    timeError,
    setTimeError,
    distance,
    setDistance,
    distanceError,
    setDistanceError,
    pace,
    setPace,
    paceError,
    setPaceError,
  } = useInputs()

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
      return setTimeError(value)
    }
    setTime(formatTime(value))
    timeChangeSideEffects(value)
  }
  function timeChangeSideEffects(value) {
    if (!value || !isValidTime(value)) {
      return setTimeError(value)
    }
    if (value === time) return
    if (distance) {
      const pace = getPace(value, distance).for(100)
      setPace(pace)
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
      return setDistanceError(value)
    }
    setDistance(value)
    distanceChangeSideEffects(value)
  }
  function distanceChangeSideEffects(value) {
    if (!value || isNaN(value) || parseInt(value) <= 0) {
      return setDistanceError(value)
    }
    if (value === distance) return
    if (time) {
      const pace = getPace(time, value).for(100)
      setPace(pace)
    } else if (pace) {
      const time = getTime(pace, value)
      setTime(time)
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
      return setPaceError(value)
    }
    setPace(formatTime(value))
    paceChangeSideEffects(value)
  }
  function paceChangeSideEffects(value) {
    if (!isValidTime(value)) {
      return setPaceError(value)
    }
    if (value === pace) return
    if (distance) {
      const time = getTime(value, distance)
      setTime(time)
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
          key={time}
          defaultValue={time}
          error={timeError}
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
          key={distance}
          defaultValue={distance}
          error={distanceError}
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
          key={pace}
          defaultValue={pace}
          error={paceError}
          onChange={handlePaceChange}
          onBlur={handlePaceBlur}
        />
      </Grid>
    </Grid>
  )
}

export default App
