import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ReportList.css";

interface ParamTypes {
  projectId: string;
  sprintId: string;
}

const ReportList = () => {
  const { projectId, sprintId } = useParams<ParamTypes>();
  return (
    <div className="report-list-card">
      <div className="graph-card">
        <Link to={`/sprints/${projectId}/${sprintId}/reports/ganttChart`}>gnaat chart</Link>
      </div>
      <div className="graph-card">velocity chart</div>
    </div>
  );
};

export default ReportList;
