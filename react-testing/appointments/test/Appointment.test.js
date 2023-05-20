import React from 'react'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Appointment,
  AppointmentsDayView
} from '../src/Appointment'


// 'describe' defines a test suite, a set of tests with a given name.
describe('Appointment', () => {
  let container

  // 'beforeEach' runs block of code before each test. Good for repeating logic.
  beforeEach(() => {
    container = document.createElement('div')
    document.body.replaceChildren(container)
  })

  // Extract render logic since it's also common.
  const render = component =>
    act(() =>
      ReactDOM.createRoot(container).render(component)
    )

  // 'it' defines a single test.
  it('renders the customer first name', () => {
    const customer = { firstName: 'Ashley' }
    // const component = <Appointment customer={customer} />
    // container = document.createElement('div')

    // // Add container to body.
    // document.body.replaceChildren(container)

    // // Since 'render' is asynchronous, 'act' pauses execution until rendering is complete.
    // // Otherwise, test will fail. Use of 'act' should be explicitly defined in package.json.
    // act(() =>
    //   ReactDOM.createRoot(container).render(component)
    // )

    render(<Appointment customer={customer} />)

    expect(document.body.textContent).toContain('Ashley')
  })
  
  it('renders another customer first name', () => {
    const customer = { firstName: 'Jordan' }
    // const component = <Appointment customer={customer} />
    // container = document.createElement('div')

    // // Add container to body.
    // document.body.replaceChildren(container)

    // act(() =>
    //   ReactDOM.createRoot(container).render(component)
    // )

    render(<Appointment customer={customer} />)

    expect(document.body.textContent).toContain('Jordan')
  })
})

describe('AppointmentsDayView', () => {
  let container

  const today = new Date()
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    },
  ]

  beforeEach(() => {
    container = document.createElement('div')
    document.body.replaceChildren(container)
  })

  const render = component =>
    act(() =>
      ReactDOM.createRoot(container).render(component)
    )

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(document.querySelector('div#appointmentsDayView')).not.toBeNull()
  })

  it('renders an ol element to display appointments', () => {
    render(<AppointmentsDayView appointments={[]} />)
    const listElement = document.querySelector('ol')
    expect(listElement).not.toBeNull()
  })

  it('renders an li for each appointment', () => {
    // const today = new Date()
    // const appointments = [
    //   { startsAt: today.setHours(12, 0) },
    //   { startsAt: today.setHours(13, 0) },
    // ]

    render(<AppointmentsDayView appointments={appointments} />)
    
    const listChildren = document.querySelectorAll('ol > li')

    expect(listChildren).toHaveLength(2)
  })

  it('renders the time of each appointment', () => {
    // const today = new Date()
    // const appointments = [
    //   { startsAt: today.setHours(12, 0) },
    //   { startsAt: today.setHours(13, 0) },
    // ]

    render(<AppointmentsDayView appointments={appointments} />)

    const listChildren = document.querySelectorAll('li')

    expect(listChildren[0].textContent).toEqual('12:00') // 'toEqual' is stricter than 'toContain'. Expectation passes only if the text content is an exact match.
    expect(listChildren[1].textContent).toEqual('13:00')
  })

  it('initially shows a message saying there are no appointments for today', () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(document.body.textContent).toContain('No appointments scheduled for today.')
  })

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(document.body.textContent).toContain('Ashley')
  })
  
  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />)

    const buttons = document.querySelectorAll('li > button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0].type).toEqual('button')
  })

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />)

    const button = document.querySelectorAll('button')[1]

    act(() => button.click())

    expect(document.body.textContent).toContain('Jordan')
  })
})