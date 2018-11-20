const TIME_MATCHER = /^((\d+):)?((\d{1,2}):)?(\d{1,2})(\.(\d{1,3}))?$/

export function getTime(paceStr, distanceInMeters) {
  const { timeInMillis: paceInMillis } = parseTime(paceStr)
  const timeInMillis = (paceInMillis * distanceInMeters) / 100

  return stringifyTime(timeInMillis)
}

export function getPace(timeStr, distanceInMeters) {
  const { timeInMillis } = parseTime(timeStr)
  const paceInMillis = timeInMillis / distanceInMeters

  const paceObject = {
    for: distance => stringifyTime(paceInMillis * distance),
  }
  return paceObject
}

export function stringifyTime(inputInMillis) {
  let result = ''
  const date = new Date(null)
  date.setMilliseconds(inputInMillis)

  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  const milliseconds = date.getUTCMilliseconds()

  if (hours > 0) {
    result += `${hours}:`
  }
  if (result.length || minutes > 0) {
    result += result.length
      ? `${minutes.toString().padStart(2, 0)}:`
      : `${minutes}:`
  }
  result += result.length ? `${seconds.toString().padStart(2, 0)}` : seconds
  if (milliseconds > 0) {
    result += `.${milliseconds.toString().replace(/0+$/, '')}`
  }

  return result
}

export function formatTime(input) {
  if (!input) return input
  return stringifyTime(parseTime(input).timeInMillis)
}

export function isValidTime(input) {
  if (!input) return false
  const matcher = TIME_MATCHER
  return matcher.test(input)
}

export function parseTime(input) {
  const matcher = TIME_MATCHER

  const matches = matcher.exec(input) || []

  const hours = parseInt(matches[4] || '0')
  const minutes = parseInt(matches[2] || '0')
  const seconds = parseInt((matches[5] || '0').padEnd(2, '0'))
  const milliseconds = parseInt((matches[7] || '0').padEnd(3, '0'))
  const timeInMillis =
    ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds
  const matchedObject = {
    input,
    hours,
    minutes,
    seconds,
    milliseconds,
    timeInMillis,
  }

  return matchedObject
}
