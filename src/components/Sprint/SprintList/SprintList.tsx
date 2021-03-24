import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SprintList.css";

// redux stuff
import { connect } from "react-redux";
import { getSprints } from "../../../store/actions/sprintActions";
import {
  ISprintMapStateToProps,
  SprintState,
  UIState,
} from "../../../interfaces/GlobalTypes";

interface ParamTypes {
  projectId: string;
}

type Props = {
  getSprints: Function;
  sprint: SprintState;
  ui: UIState;
};
const SprintList: React.FC<Props> = ({ getSprints }) => {
  const { projectId } = useParams<ParamTypes>();

  useEffect(() => {
    getSprints(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="sprint-list-card">hello from sprint list {projectId}</div>
  );
};
const mapStateToProps = (state: ISprintMapStateToProps) => ({
  sprint: state.sprint,
  ui: state.ui,
});

const mapActionToProps = {
  getSprints,
};
export default connect(mapStateToProps, mapActionToProps)(SprintList);
