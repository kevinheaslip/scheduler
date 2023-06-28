// takes in an appointments object and returns an array of appointments for a given day
export function getAppointmentsForDay(state, day) {
  if (!state.days.length) {
    return [];
  }

  const foundDay = state.days.find((stateDay) => {
    return stateDay.name === day;
  })

  if (!foundDay) {
    return [];
  }

  const appointmentArr = foundDay.appointments.map(element => {
    return state.appointments[element];
  })

  return appointmentArr;
}