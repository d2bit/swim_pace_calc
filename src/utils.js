export function parseTime(input) {
  const matcher = /((\d+):)?((\d{1,2}):)?(\d{1,2})(\.(\d{1,3}))?/

  const matches = matcher.exec(input)

  const hours = parseInt(matches[4] || '0')
  const minutes = parseInt(matches[2] || '0')
  const seconds = parseInt(matches[5])
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
