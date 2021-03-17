import React, { useEffect, useState } from "react";
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
  project: ProjectState,
};
const array = [1, 2, 3, 4, 5];
const MyCreatedProjectList: React.FC<Props> = ({ getMyCreatedProjects, project }) => {
    // const [projects, setProjects] = useState<Project[]>([]);
    
  useEffect(() => {
    getMyCreatedProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectsMarkuo = project.myCreatedProjects.map((item: Project) => {
    return <ProjectListCard key={item._id} project={item}/>;
  });
  return (
    <div className="my-created-project-wrapper">
      <h2>Created Projects</h2>
      {projectsMarkuo}
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
