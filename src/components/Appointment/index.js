import React from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';

import { useVisualMode } from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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
      props.bookInterview(props.id, interview);
      transition(SHOW);
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
            onCancel={() => back(EMPTY)}
          />
        </>
      )}
      {mode === SAVING && (
        <>
          <Status message={"Saving..."} />
        </>
      )}
    </article>
  );
}