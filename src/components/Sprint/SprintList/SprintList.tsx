import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SprintList.css";
import { CreateSprintDialog, SprintListCard } from "../../../components";
import {
  LinkSkeleton,
  ProjectListCardSkeleton,
  TitleSkeleton,
} from "../../../utility/components";
// redux stuff
import { connect } from "react-redux";
import { getSprints } from "../../../store/actions/sprintActions";
import {
  IAllMapStateToProps,
  SprintState,
  UIState,
  UserState,
} from "../../../interfaces/GlobalTypes";
import { Button } from "@material-ui/core";

interface ParamTypes {
  projectId: string;
}

type Props = {
  getSprints: Function;
  sprint: SprintState;
  ui: UIState;
  user: UserState;
};
const SprintList: React.FC<Props> = ({ getSprints, sprint, ui, user }) => {
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
      {ui.globalLoading ? (
        <LinkSkeleton />
      ) : (
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
      )}
      {ui.globalLoading ? (
        <TitleSkeleton />
      ) : (
        <div className="navigation-title">
          {sprint.projectDetails.ProjectName}'s sprints
        </div>
      )}
      <div className="custom-header">
        {sprint.projectDetails.CreatedBy === user.userId && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Create Sprint
            </Button>
            <CreateSprintDialog
              open={open}
              onClose={handleClose}
              isUpdate={isUpdate}
            />
          </div>
        )}
      </div>
      {!ui.localLoading && sprint.sprints.length > 0 && sprintsMarkup}
      {!ui.localLoading && sprint.sprints.length === 0 && noSprintMarkup}
      {sprint.hasSprintErrors && !ui.localLoading && errorMarkup}
      {ui.localLoading && loadingMarkup}
    </div>
  );
};
const mapStateToProps = (state: IAllMapStateToProps) => ({
  sprint: state.sprint,
  user: state.user,
  ui: state.ui,
});

const mapActionToProps = {
  getSprints,
};
export default connect(mapStateToProps, mapActionToProps)(SprintList);
