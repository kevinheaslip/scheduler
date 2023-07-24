import React from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import { useVisualMode } from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  //
  function destroy() {
    transition(DELETING, true);
    
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
  
  return (
    <article className='appointment' data-testid="appointment">
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
            onConfirm={destroy}
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
      {mode === ERROR_SAVE && (
        <>
          <Header time={props.time} />
          <Error
            message={"Could not save appointment."}
            onClose={() => back()}
          />
        </>
      )}
      {mode === ERROR_DELETE && (
        <>
          <Header time={props.time} />
          <Error
            message={"Could not cancel appointment."}
            onClose={() => back()}
          />
        </>
      )}
    </article>
  );
}