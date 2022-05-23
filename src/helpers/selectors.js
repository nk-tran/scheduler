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

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  if(interview.interviewer) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(({name}) => name === day);

  if (filteredDays.length > 0) {
    const interviews = filteredDays[0].interviewers;
    const interviewsForDay = [];

    for (const interview of interviews) {
      if (state.interviewers[interview]) {
        interviewsForDay.push(state.interviewers[interview])
      }
    }

    return interviewsForDay;
  }

  return filteredDays;
}