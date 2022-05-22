import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment/index";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors"


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });


  const schedule = dailyAppointments.map((appointment) => {
    return (
    <Appointment 
      key={appointment.id} 
      id={appointment.id} 
      time={appointment.time} 
      interview={appointment.interview} 
    />)
  })

  // useEffect(() => {
  //   const testURL = `/api/days`;
  //   axios.get(testURL).then(response => {
  //     setDays(response.data)
  //   });
  // }, []);

  useEffect(() => {
    const dayURL = `/api/days`;
    const appURL = `/api/appointments`;
    const intURL = `/api/interviewers`;
    Promise.all([
      axios.get(dayURL),
      axios.get(appURL),
      axios.get(intURL)
    ]).then((all) => {
      console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments : all[1].data, interviewers: all[2].data }));
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
