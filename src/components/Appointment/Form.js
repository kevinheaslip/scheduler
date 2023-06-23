import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  // clear the form values on cancel button click
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  // reset form and call onCancel
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            onCancel={props.onCancel}
            onSave={props.onSave}
          />
        </form>
        <InterviewerList
          value={interviewer}
          onChange={setInterviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm /* */>Save</Button>
        </section>
      </section>
    </main>
  )
}