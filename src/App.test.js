import React from 'react'
import { render, fireEvent, waitForElement } from 'react-testing-library'
import App from './App'

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

it('Updates swimming time filling the pace and having a distance', () => {
  const { getByLabelText } = render(<App />)

  const distanceInput = getByLabelText(/Distance/)
  fireEvent.change(distanceInput, { target: { value: '800' } })
  fireEvent.blur(distanceInput, { target: { value: '800' } })

  const paceInput = getByLabelText(/Pace/)
  fireEvent.change(paceInput, { target: { value: '1:20' } })
  fireEvent.blur(paceInput, { target: { value: '1:20' } })

  const timeInput = getByLabelText(/Time/)
  expect(timeInput.value).toEqual('10:40')
})

it('Allows using , intead of : (mobile friendly)', async () => {
  const { getByValue, getByLabelText } = render(<App />)

  const paceInput = getByLabelText(/Pace/)
  fireEvent.change(paceInput, { target: { value: '1,5' } })
  fireEvent.blur(paceInput, { target: { value: '1,5' } })

  await waitForElement(() => getByValue('1:50'))
  //expect(paceInput.value).toEqual('1:50')
})

it('BUG - set distance and pace to have a >1hour swim', () => {
  const { getByLabelText } = render(<App />)

  const distanceInput = getByLabelText(/Distance/)
  fireEvent.change(distanceInput, { target: { value: '8000' } })
  fireEvent.blur(distanceInput, { target: { value: '8000' } })
  const paceInput = getByLabelText(/Pace/)
  fireEvent.change(paceInput, { target: { value: '1,3' } })
  fireEvent.blur(paceInput, { target: { value: '1,3' } })

  const timeInput = getByLabelText(/Time/)
  expect(timeInput.value).toEqual('2:00:00')
})
