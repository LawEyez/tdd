import { useState } from "react"

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(":")
  return `${h}:${m}`
}

export const Appointment = ({ customer }) => {
  return (
    <div>{customer.firstName}</div>
  )
}

export const AppointmentsDayView = ({ appointments }) => {
  const [activeAppointment, setActiveAppointment] = useState(appointments[0])

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setActiveAppointment(appointment)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>

      {appointments.length === 0 ? (
        <p>No appointments scheduled for today.</p>
      ) : (
        <Appointment {...activeAppointment} />
      )}
    </div>
  )
}
