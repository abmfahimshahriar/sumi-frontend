import React from 'react';
import "./MiddlePart.css";
import taskListImage from "../../../utility/images/taskList.jpg"
const MiddlePart = () => {
    return (
        <div className="middle-part-wrapper">
            <div className="task-list-img-wrapper">
                <img className="task-list-img" src={taskListImage} alt="taskList" />
            </div>
            <div className="feature-text">
                <h1>
                    Plan
                </h1>
                <p>
                    Create user stories and issues, plan sprints,
                    and distribute tasks across your software team.
                </p>

                <h1>
                    Track
                </h1>
                <p>
                    Prioritize and discuss your
                    team’s work in full context with complete visibility.
                </p>
            </div>
        </div>
    )
}

export default MiddlePart;