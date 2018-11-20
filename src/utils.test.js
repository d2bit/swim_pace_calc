import {
  isValidTime,
  formatTime,
  parseTime,
  stringifyTime,
  getPace,
  getTime,
} from './utils'

describe('getTime', () => {
  it('converts pace and distance to time', () => {
    const pace = '1:30'
    const distance = 800
    const expectedTime = '12:00'

    const time = getTime(pace, distance)

    expect(time).toEqual(expectedTime)
  })
})

describe('getPace', () => {
  it('converts time and distance to pace', () => {
    const time = '12:00'
    const distance = 800
    const pace = getPace(time, distance)

    const expectedHundredPace = '1:30'
    const expectedFiftyPace = '45'
    const expectedTwentyFivePace = '22.5'

    const hundredPace = pace.for(100)
    expect(hundredPace).toEqual(expectedHundredPace)

    const fiftyPace = pace.for(50)
    expect(fiftyPace).toEqual(expectedFiftyPace)

    const twentyFivePace = pace.for(25)
    expect(twentyFivePace).toEqual(expectedTwentyFivePace)
  })
})

describe('stringifyTime', () => {
  it('returns hours:minutes:seconds', () => {
    const timeInMillis = 7200000
    const expectedTime = '2:00:00'

    const time = stringifyTime(timeInMillis)
    expect(time).toEqual(expectedTime)
  })

  it('returns minutes:seconds', () => {
    const timeInMillis = 67000
    const expectedTime = '1:07'

    const time = stringifyTime(timeInMillis)
    expect(time).toEqual(expectedTime)
  })

  it('returns minutes:seconds.millis', () => {
    const timeInMillis = 67810
    const expectedTime = '1:07.81'

    const time = stringifyTime(timeInMillis)
    expect(time).toEqual(expectedTime)
  })

  it('returns seconds', () => {
    const timeInMillis = 17000
    const expectedTime = '17'

    const time = stringifyTime(timeInMillis)
    expect(time).toEqual(expectedTime)
  })

  it('returns seconds.millis', () => {
    const timeInMillis = 7810
    const expectedTime = '7.81'

    const time = stringifyTime(timeInMillis)
    expect(time).toEqual(expectedTime)
  })
})

describe('isValidTime', () => {
  it('returns true for valid string time inputs', () => {
    const times = ['12', '12:00', '12:00.2', '1:15:30.5']

    times.forEach(time => {
      expect(isValidTime(time)).toBe(true)
    })
  })

  it('returns false for valid string time inputs', () => {
    const times = ['string', '12,00']

    times.forEach(time => {
      expect(isValidTime(time)).toBe(false)
    })
  })
})

describe('formatTime', () => {
  it('reformarts the time string', () => {
    const time = '1:3'
    const formattedTime = formatTime(time)
    const expectedTime = '1:30'

    expect(formattedTime).toEqual(expectedTime)
  })
})

describe('parseTime', () => {
  it('parses one digit seconds as x10', () => {
    const time = '1:3'
    const expectedMilliseconds = 90000
    const parsedTime = parseTime(time)

    expect(parsedTime.timeInMillis).toEqual(expectedMilliseconds)
  })
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
