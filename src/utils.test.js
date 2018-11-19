import { parseTime } from './utils'

describe('parseTime', () => {
  it('parses seconds.millis to millis', () => {
    const time = '17.83'
    const expectedMilliseconds = 17830
    const parsedTime = parseTime(time)

    expect(parsedTime.timeInMillis).toEqual(expectedMilliseconds)
  })

  it('parses minutes:seconds.millis to millis', () => {
    const time = '1:17.8'
    const expectedMilliseconds = 77800
    const parsedTime = parseTime(time)

    expect(parsedTime.timeInMillis).toEqual(expectedMilliseconds)
  })

  it('parses minutes:seconds to millis', () => {
    const time = '1:17'
    const expectedMilliseconds = 77000
    const parsedTime = parseTime(time)

    expect(parsedTime.timeInMillis).toEqual(expectedMilliseconds)
  })

  it('parses hour:minutes:seconds.millis to millis', () => {
    const time = '1:20:17.912'
    const expectedMilliseconds = 72077912
    const parsedTime = parseTime(time)

    expect(parsedTime.timeInMillis).toEqual(expectedMilliseconds)
  })

  it('parses hour:minutes:seconds to millis', () => {
    const time = '1:20:17'
    const expectedMilliseconds = 72077000
    const parsedTime = parseTime(time)

    expect(parsedTime.timeInMillis).toEqual(expectedMilliseconds)
  })
})
