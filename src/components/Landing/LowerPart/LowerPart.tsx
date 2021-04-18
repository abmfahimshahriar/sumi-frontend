import React from 'react';
import "./LowerPart.css";
import flowChart from "../../../utility/images/flowChart.jpg"
const LowerPart = () => {
    return (
        <div className="lower-part-wrapper">
            <div className="workflow-text-wrapper">
                <div className="workflow-main-text">
                    <h1>
                        Make your own workflow
                    </h1>
                </div>
                <div className="workflow-support-text">
                    <p className="landing-page-paragraph">
                        Every team has a unique process
                        for managing projects.
                        Create one to match the way your team works.
                    </p>
                </div>
            </div>
            <div className="workflow-img-wrapper">
                <img className="workflow-list-img" src={flowChart} alt="taskList" />
            </div>
        </div>
    )
}

export default LowerPart;