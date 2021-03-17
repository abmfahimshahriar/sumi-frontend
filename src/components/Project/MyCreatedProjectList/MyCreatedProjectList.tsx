import React, { useEffect } from "react";
import {
  IProjectMapStateToProps,
  Project,
  ProjectState,
  UIState,
} from "../../../interfaces/GlobalTypes";
import { ProjectListCard } from "../../../components";
import "./MyCreatedProjectList.css";
import {ProjectListCardSkeleton} from "../../../utility/components";

// redux stuff
import { connect } from "react-redux";
import { getMyCreatedProjects } from "../../../store/actions/projectAction";

type Props = {
  getMyCreatedProjects: Function;
  project: ProjectState;
  ui: UIState;
};
const MyCreatedProjectList: React.FC<Props> = ({
  getMyCreatedProjects,
  project,
  ui,
}) => {
  useEffect(() => {
    getMyCreatedProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectsMarkup = project.myCreatedProjects.map((item: Project) => {
    return <ProjectListCard key={item._id} project={item} />;
  });
  const errorMarkup = <div>{project.projectErrors[0]}</div>;
  const noProjectsMarkup = <div>You have not created any projects yet</div>;
  const loadingCounter = [1,2];
  const loadingMarkup = loadingCounter.map((item: number) => <ProjectListCardSkeleton key={item}/>);
  return (
    <div className="my-created-project-wrapper">
      <h2>Created Projects</h2>
      {!project.hasProjectErrors &&
        !ui.createdProjectLoading &&
        project.myCreatedProjects.length > 0 &&
        projectsMarkup}
      {!project.hasProjectErrors &&
        !ui.createdProjectLoading &&
        project.myCreatedProjects.length === 0 &&
        noProjectsMarkup}
      {project.hasProjectErrors && !ui.createdProjectLoading && errorMarkup}
      {ui.createdProjectLoading && loadingMarkup}
    </div>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
  ui: state.ui,
});

const mapActionToProps = {
  getMyCreatedProjects,
};
export default connect(mapStateToProps, mapActionToProps)(MyCreatedProjectList);
