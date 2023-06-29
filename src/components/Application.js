import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // get array of appointments for day from appointments object
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // create an array of <Appointment> components
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        // key={appointment.id}
        // {...appointment}
        // interview={interview}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    )
  })
  
  // add the last appointment for the day to the <Appointment> array
  schedule.push(<Appointment key="last" time="5pm" />);
  
  // update day
  const setDay = day => setState({ ...state, day });

  // get days and appointments data, update days and appointments state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, []);

  console.log(state.interviewers);

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
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}