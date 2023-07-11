import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // update day
  const setDay = day => setState({ ...state, day });

  // get days and appointments data, update days and appointments state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch(error => console.log(error))
  }, []);

  // update the number of spots remaining in a day
  function updateSpots(requestType) {
    const days = state.days.map(day => {
      if (day.name === state.day) {
        if (requestType === 'bookAppointment') {
          return { ...day, spots: day.spots - 1 }
        } else {
          return { ...day, spots: day.spots + 1 }
        }
      } else {
        return { ...day }
      }
    })
    return days;
  }


  // update local state and server when an interview is booked
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id]
    };
    const hasInterview = appointment.interview;
    appointment.interview = { ...interview };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    let days = state.days;

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response);

        // only update spots on a new appointment, not editing an existing one
        if (!hasInterview) {
          days = updateSpots('bookAppointment');
        }

        setState({
          ...state,
          appointments,
          days
        })
      })
  }

  // use appointment id to set interview data to null
  function cancelInterview(id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        console.log(response);

        const days = updateSpots();

        setState({
          ...state,
          appointments,
          days
        })
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}