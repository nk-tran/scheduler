import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const showName = () => {
    if (props.selected) {
      return props.name
    }
  }

  return (
    <li onClick={() => props.setInterviewer(props.name)} className={interviewClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName()}
    </li>
  );
}
