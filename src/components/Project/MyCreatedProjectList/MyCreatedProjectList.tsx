import React, { useEffect } from "react";
import {
  IProjectMapStateToProps,
  Project,
  ProjectState,
} from "../../../interfaces/GlobalTypes";
import { ProjectListCard } from "../../../components";
import "./MyCreatedProjectList.css";

// redux stuff
import { connect } from "react-redux";
import { getMyCreatedProjects } from "../../../store/actions/projectAction";

type Props = {
  getMyCreatedProjects: Function;
  project: ProjectState;
};
const MyCreatedProjectList: React.FC<Props> = ({
  getMyCreatedProjects,
  project,
}) => {
  useEffect(() => {
    getMyCreatedProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectsMarkup = project.myCreatedProjects.map((item: Project) => {
    return <ProjectListCard key={item._id} project={item} />;
  });
  const errorMarkup = <div>{project.projectErrors[0]}</div>;
  const noProjectsMarkup = (
    <div>You have not created any projects yet</div>
  );
  return (
    <div className="my-created-project-wrapper">
      <h2>Created Projects</h2>
      {!project.hasProjectErrors &&
        project.myCreatedProjects.length > 0 &&
        projectsMarkup}
      {!project.hasProjectErrors &&
        project.myCreatedProjects.length === 0 &&
        noProjectsMarkup}
      {project.hasProjectErrors && errorMarkup}
    </div>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
});

const mapActionToProps = {
  getMyCreatedProjects,
};
export default connect(mapStateToProps, mapActionToProps)(MyCreatedProjectList);
