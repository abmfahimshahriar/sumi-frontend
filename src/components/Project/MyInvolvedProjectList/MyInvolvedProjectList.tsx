import React, { useEffect } from "react";
import {
  IProjectMapStateToProps,
  Project,
  ProjectState,
  UIState,
} from "../../../interfaces/GlobalTypes";
import { ProjectListCard } from "../../../components";
import "./MyInvolvedProjectList.css";
import {ProjectListCardSkeleton} from "../../../utility/components";

// redux stuff
import { connect } from "react-redux";
import { getMyInvolvedProjects } from "../../../store/actions/projectAction";

type Props = {
  getMyInvolvedProjects: Function;
  project: ProjectState;
  ui: UIState;
};
const MyInvolvedProjectList: React.FC<Props> = ({
  getMyInvolvedProjects,
  project,
  ui,
}) => {
  useEffect(() => {
    getMyInvolvedProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectsMarkup = project.myInvolvedProjects.map((item: Project) => {
    return <ProjectListCard key={item._id} project={item} />;
  });
  const errorMarkup = <div>{project.projectErrors[0]}</div>;
  const noProjectsMarkup = (
    <div>You are currently not involved in any other projects.</div>
  );
  const loadingCounter = [1,2];
  const loadingMarkup = loadingCounter.map((item: number) => <ProjectListCardSkeleton key={item}/>)
  return (
    <div className="my-involved-project-wrapper">
      <h2>Involved Projects</h2>
      {!project.hasProjectErrors &&
        !ui.involvedProjectLoading &&
        project.myInvolvedProjects.length > 0 &&
        projectsMarkup}
      {!project.hasProjectErrors &&
        !ui.involvedProjectLoading &&
        project.myInvolvedProjects.length === 0 &&
        noProjectsMarkup}
      {project.hasProjectErrors && !ui.involvedProjectLoading && errorMarkup}
      {ui.involvedProjectLoading && loadingMarkup}
    </div>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
  ui: state.ui,
});

const mapActionToProps = {
  getMyInvolvedProjects,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(MyInvolvedProjectList);
