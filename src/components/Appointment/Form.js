import React, { useState } from "react";
import Button from "components/Button"  
import InterviewerList from "components/InterviewerList"  


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("")
    setInterviewer(null)
    setError("")
  }

  
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    // if (!interviewer) {
    //   setError("Interviewer cannot be blank")
    //   return;
    // }
    
    props.onSave(student, interviewer);
    console.log("test", student)
    setError("")
  }




  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
          onSubmit={event => event.preventDefault()} 
          autoComplete="off"
          > 
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            onChange={(event) => {setStudent(event.target.value)}}
            type="text"
            placeholder="Enter Student Name"
            />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers = {props.interviewers}
          value = {interviewer}
          onChange={setInterviewer}
          interviewer={props.interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        <Button danger onClick={()=>{props.onCancel(); reset()}}>Cancel</Button>
          <Button confirm onClick={()=> {validate()}}>Save</Button>
        </section>
      </section>
    </main>
  );
}






