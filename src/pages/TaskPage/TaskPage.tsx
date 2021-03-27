import React from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  projectId: string;
  sprintId: string;
}

const TaskPage = () => {
  const { projectId, sprintId } = useParams<ParamTypes>();
  return (
    <div>
      <div>hello from task page</div>
      <div>{projectId}</div>
      <div>{sprintId}</div>
    </div>
  );
};

export default TaskPage;
