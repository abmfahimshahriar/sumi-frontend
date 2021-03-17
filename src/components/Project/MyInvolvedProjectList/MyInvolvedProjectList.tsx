import React, { useEffect } from "react";
import {
  IProjectMapStateToProps,
  Project,
  ProjectState,
} from "../../../interfaces/GlobalTypes";
import { ProjectListCard } from "../../../components";
import "./MyInvolvedProjectList.css";

// redux stuff
import { connect } from "react-redux";
import { getMyInvolvedProjects } from "../../../store/actions/projectAction";

type Props = {
  getMyInvolvedProjects: Function;
  project: ProjectState;
};
const MyInvolvedProjectList: React.FC<Props> = ({
  getMyInvolvedProjects,
  project,
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
  return (
    <div className="my-involved-project-wrapper">
      <h2>Involved Projects</h2>
      {!project.hasProjectErrors &&
        project.myInvolvedProjects.length > 0 &&
        projectsMarkup}
      {!project.hasProjectErrors &&
        project.myInvolvedProjects.length === 0 &&
        noProjectsMarkup}
      {project.hasProjectErrors && errorMarkup}
    </div>
  );
};

const mapStateToProps = (state: IProjectMapStateToProps) => ({
  project: state.project,
});

const mapActionToProps = {
  getMyInvolvedProjects,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(MyInvolvedProjectList);
