import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ReportList.css";
import ganttChartImage from "../../../utility/images/gantt.png";
interface ParamTypes {
  projectId: string;
  sprintId: string;
}

const ReportList = () => {
  const { projectId, sprintId } = useParams<ParamTypes>();
  return (
    <div className="report-list-card">
      <h2>Available reports</h2>
      <div className="graph-card-wrapper">
        <div className="graph-card">
          <Link to={`/sprints/${projectId}/${sprintId}/reports/ganttChart`}>
            <div className="chart-header">gnaat chart</div>
          </Link>
          <img className="chart-img" src={ganttChartImage} alt="ganttChart" />
        </div>
        <div className="graph-card">
          <Link to={`/sprints/${projectId}/${sprintId}/reports/ganttChart`}>
            <div className="chart-header">Velocity chart</div>
          </Link>
          <img className="chart-img" src={ganttChartImage} alt="ganttChart" />
        </div>
      </div>
    </div>
  );
};

export default ReportList;
