import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import App from './App'

it('Calculates swimming pace clicking on Calculate button', () => {
  const { getByText, getByLabelText } = render(<App />)

  const timeInput = getByLabelText(/Time/)
  fireEvent.change(timeInput, { target: { value: '12:00' } })
  fireEvent.blur(timeInput, { target: { value: '12:00' } })
  const distanceInput = getByLabelText(/Distance/)
  fireEvent.change(distanceInput, { target: { value: '800' } })
  fireEvent.blur(distanceInput, { target: { value: '800' } })

  const calculateBtn = getByText('Calculate')
  fireEvent.click(calculateBtn)

  const paceInput = getByLabelText(/Pace/)
  expect(paceInput.value).toEqual('1:30')
})

it('Updates swimming pace filling the time and having a distance', () => {
  const { getByLabelText } = render(<App />)

  const distanceInput = getByLabelText(/Distance/)
  fireEvent.change(distanceInput, { target: { value: '800' } })
  fireEvent.blur(distanceInput, { target: { value: '800' } })
  const timeInput = getByLabelText(/Time/)
  fireEvent.change(timeInput, { target: { value: '11:00' } })
  fireEvent.blur(timeInput, { target: { value: '11:00' } })

  const paceInput = getByLabelText(/Pace/)
  expect(paceInput.value).toEqual('1:22.5')
})

it('Updates swimming pace filling the distance and having a time', () => {
  const { getByLabelText } = render(<App />)

  const timeInput = getByLabelText(/Time/)
  fireEvent.change(timeInput, { target: { value: '11:00' } })
  fireEvent.blur(timeInput, { target: { value: '11:00' } })
  const distanceInput = getByLabelText(/Distance/)
  fireEvent.change(distanceInput, { target: { value: '800' } })
  fireEvent.blur(distanceInput, { target: { value: '800' } })

  const paceInput = getByLabelText(/Pace/)
  expect(paceInput.value).toEqual('1:22.5')
})
