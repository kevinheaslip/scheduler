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

  // update local state and server when an interview is booked
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response);

        setState({
          ...state,
          appointments
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

        setState({
          ...state,
          appointments
        })
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}