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

// takes in an object containing an interviewer and returns an object that contains interview data
export function getInterview(state, interview) {
  const interviewObj = {};

  if (interview) {
    interviewObj.student = interview.student;
    const interviewerID = interview.interviewer;
    interviewObj.interviewer = state.interviewers[interviewerID];
    
    return interviewObj;
  }
  
  return null;
}

// takes in an appointment object and returns an array of interviewer objects
export function getInterviewersForDay(state, day) {
  if (!state.days.length) {
    return [];
  }

  const foundDay = state.days.find((stateDay) => {
    return stateDay.name === day;
  })

  if (!foundDay) {
    return [];
  }

  const interviewersArr = foundDay.interviewers.map(element => {
    return state.interviewers[element];
  })

  return interviewersArr;
}