import React, { useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  
  const setDay = (day) => setState({ ...state, day });
  
  function bookInterview(id, interview) {
    console.log({interview})
    const appointmentBook = appointmentIncluded(id) 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log({appointments})
    // Updating spots in day
    let scheduleDay = null;
    let days = null;
    for(let day of state.days) {
      if(day.appointments.includes(id) && appointmentBook === false) {
        scheduleDay = {...day, spots: day.spots-1};
        days = state.days.splice(scheduleDay.id-1, 1, scheduleDay)
      } else {
        scheduleDay = day
        days = state.days
      }
    }
  
    return(axios.put(`/api/appointments/${id}`, {...appointment})
      .then((res)=>{
          setState(prev=> ({...prev, appointments, days}))
      }))
  };
  
  function cancelInterview(id) {
    return(axios.delete(`/api/appointments/${id}`)
    .then((res)=>{
      if(res.status) {
        // axios.get('/api/appointments/')
        //   .then((res) => {
        //     setState((prev) => ({
        //       ...prev,
        //       appointments: res.data,
        //     }))
        //   })
        const dayURL = `/api/days`;
        const appURL = `/api/appointments`;
        const intURL = `/api/interviewers`;
        Promise.all([axios.get(dayURL), axios.get(appURL), axios.get(intURL)]).then(
          (all) => {
            console.log(all);
            setState((prev) => ({
              ...prev,
              days: all[0].data,
              appointments: all[1].data,
              interviewers: all[2].data,
            }));
          }
        );
      }}))
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // }
    // const appointments = {
    //   ...state.appointments,
    //   [id]:appointment
    // }
    //     // Update spot of day
    // let scheduleDay = null;
    // for(let day of state.days) {
    //   if(day.appointments.includes(id)) {
    //     scheduleDay= {...day, spots: day.spots+1};
    //   }
    // }
  
    // const days = state.days.splice(scheduleDay.id-1, 1, scheduleDay)
    // console.log(days)

    // const days = state.days.filter()
  }




  function appointmentIncluded(id) {
    if(state.appointments[id].interview === null) {
      return false;
    } else {

      // console.log(state.appointments[id])
      return true;
    }
  };



  useEffect(() => {
    const dayURL = `/api/days`;
    const appURL = `/api/appointments`;
    const intURL = `/api/interviewers`;
    Promise.all([axios.get(dayURL), axios.get(appURL), axios.get(intURL)]).then(
      (all) => {
        console.log(all);
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      }
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview} 
}