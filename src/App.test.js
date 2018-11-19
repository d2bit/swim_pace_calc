import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import App from './App'

it('Calculates swimming pace', () => {
  const { getByText, getByLabelText } = render(<App />)

  const timeInput = getByLabelText(/Time/)
  fireEvent.change(timeInput, { target: { value: '12:00' } })
  const distanceInput = getByLabelText(/Distance/)
  fireEvent.change(distanceInput, { target: { value: '800' } })

  const calculateBtn = getByText('Calculate')
  fireEvent.click(calculateBtn)

  const paceInput = getByLabelText(/Pace/)
  expect(paceInput.value).toEqual('1:30')
})
