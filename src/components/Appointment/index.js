import React from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import { useVisualMode } from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    //
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
    }

    //
    function deleteAppointment() {
      transition(DELETING);
      props.cancelInterview(props.id)
        .then(() => {
          transition(EMPTY);
        })
    }
  
  return (
    <article className='appointment'>
      {mode === EMPTY && (
        <>
          <Header time={props.time} />
          <Empty onAdd={() => transition(CREATE)} />
        </>
      )}
      {mode === SHOW && (
        <>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        </>
      )}
      {mode === CREATE && (
        <>
          <Header time={props.time} />
          <Form
            student={props.student}
            interviewer={props.interviewer}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back()}
          />
        </>
      )}
      {mode === SAVING && (
        <>
          <Header time={props.time} />
          <Status message={"Saving"} />
        </>
      )}
      {mode === DELETING && (
        <>
          <Header time={props.time} />
          <Status message={"Deleting"} />
        </>
      )}
      {mode === CONFIRM && (
        <>
          <Header time={props.time} />
          <Confirm
            message={"Are you sure you would like to delete?"}
            onCancel={() => back()}
            onConfirm={deleteAppointment}
          />
        </>
      )}
      {mode === EDIT && (
        <>
          <Header time={props.time} />
          <Form 
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back()}
          />
        </>
      )}
    </article>
  );
}