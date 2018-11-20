import { useReducer } from 'react'

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

export default function useInputs() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    time: state.time,
    setTime: time => dispatch(setTime(time)),
    timeError: state.timeError,
    setTimeError: time => dispatch(setTimeError(time)),
    distance: state.distance,
    setDistance: distance => dispatch(setDistance(distance)),
    distanceError: state.distanceError,
    setDistanceError: distance => dispatch(setDistanceError(distance)),
    pace: state.pace,
    setPace: pace => dispatch(setPace(pace)),
    paceError: state.paceError,
    setPaceError: pace => dispatch(setPaceError(pace)),
  }
}
