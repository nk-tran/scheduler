export function getAppointmentsForDay(state, dayName) {
  const day = state.days.find(day => day.name === dayName);

  if (!day || !state.days.length) {
    return []
  }

  const appointmentArray = day.appointments.map((appointmentID) => {
    return state.appointments[appointmentID]
  })


  return appointmentArray;
}