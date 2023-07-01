import React from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';

import { useVisualMode } from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
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
          // onEdit={ }
          // onDelete={ }
          />
        </>
      )}
      {mode === CREATE && (
        <>
          <Header time={props.time} />
          <Form
            student={props.student}
            interviewer={props.interviewer}
            interviewers={[]}
            // onSave={ }
            onCancel={() => back(EMPTY)}
          />
        </>
      )}
    </article>
  );
}