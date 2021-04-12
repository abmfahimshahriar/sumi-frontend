import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SprintList.css";
import { CreateSprintDialog, SprintListCard } from "../../../components";
import { ProjectListCardSkeleton } from "../../../utility/components";
// redux stuff
import { connect } from "react-redux";
import { getSprints } from "../../../store/actions/sprintActions";
import {
  ISprintMapStateToProps,
  SprintState,
  UIState,
} from "../../../interfaces/GlobalTypes";
import { Button } from "@material-ui/core";

interface ParamTypes {
  projectId: string;
}

type Props = {
  getSprints: Function;
  sprint: SprintState;
  ui: UIState;
};
const SprintList: React.FC<Props> = ({ getSprints, sprint, ui }) => {
  const { projectId } = useParams<ParamTypes>();

  const [open, setOpen] = useState(false);
  const isUpdate = false;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSprints(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sprintsMarkup = sprint.sprints.map((item) => {
    return <SprintListCard key={item._id} sprint={item} />;
  });

  const errorMarkup = <div>{sprint.sprintErrors[0]}</div>;
  const noSprintMarkup = <div>There are no sprints under this project</div>;
  const loadingCounter = [1, 2];
  const loadingMarkup = loadingCounter.map((item: number) => (
    <ProjectListCardSkeleton key={item} />
  ));
  return (
    <div className="sprint-list-card">
      <div className="navigation-link">
        <Link to="/projects" style={{ marginRight: "8px" }}>
          Projects
        </Link>
        \
        <Link
          to={`/projects/${sprint.projectDetails._id}`}
          style={{ margin: "0 8px" }}
        >
          {sprint.projectDetails.ProjectName}
        </Link>
      </div>
      <div className="navigation-title">
        {sprint.projectDetails.ProjectName}'s sprints
      </div>
      <div className="custom-header">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create Sprint
        </Button>
        <CreateSprintDialog
          open={open}
          onClose={handleClose}
          isUpdate={isUpdate}
        />
      </div>
      {!sprint.hasSprintErrors &&
        !ui.localLoading &&
        sprint.sprints.length > 0 &&
        sprintsMarkup}
      {!sprint.hasSprintErrors &&
        !ui.localLoading &&
        sprint.sprints.length === 0 &&
        noSprintMarkup}
      {sprint.hasSprintErrors && !ui.localLoading && errorMarkup}
      {ui.localLoading && loadingMarkup}
    </div>
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
