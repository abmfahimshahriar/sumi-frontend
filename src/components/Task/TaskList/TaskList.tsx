import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ITaskMapStateToProps } from "../../../interfaces/GlobalTypes";
import { useParams } from "react-router-dom";
import { getTasks } from "../../../store/actions/taskActions";

interface ParamTypes {
  projectId: string;
  sprintId: string;
}

type Props = {
  getTasks: Function;
};

const TaskList: React.FC<Props> = ({ getTasks }) => {
  const { projectId, sprintId } = useParams<ParamTypes>();
  useEffect(() => {
    getTasks(sprintId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>hello from task page</div>
  );
};

const mapStateToProps = (state: ITaskMapStateToProps) => ({
  task: state.task,
  ui: state.ui,
});

const mapActionToProps = {
  getTasks,
};
export default connect(mapStateToProps, mapActionToProps)(TaskList);
