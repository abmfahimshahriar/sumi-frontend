export interface IUser {
  UserId?: string;
  Email: string;
  Password: string;
  Token?: string;
}

export interface UserAction {
  Type: string;
  PayLoad?: any;
}

export interface SumiBackendResponse {
  IsSuccess: boolean;
  Result: any;
  Results: any[];
  Errors: string[];
}

export interface UserState {
  userId: string;
  token: string;
  isAuthenticated: boolean;
  hasAuthErrors: boolean;
  authErrors: string[];
  authSuccessMessage: string;
}

interface usersListItem {
  _id: string,
  Email: string
}
export interface ProjectState {
  myCreatedProjects: Project[];
  myInvolvedProjects: Project[];
  hasProjectErrors: boolean;
  projectErrors: string[];
  usersList: usersListItem[];
}

export interface UIState {
  localLoading: boolean;
  globalLoading: boolean;
  createdProjectLoading: boolean;
  involvedProjectLoading: boolean;
}

export interface DispatchActionTypes {
  type: string;
  payload?: any;
}

export interface IUserMapStateToProps {
  user: UserState;
}

export interface IProjectMapStateToProps {
  project: ProjectState;
  ui: UIState;
}

export type DispatchType = (args: UserAction) => UserAction;

export interface Project {
  _id: string;
  ProjectName: string;
  StartDate: string;
  EndDate: string;
  CreatedBy: string;
  TotalStoryPoints: number;
  CompletedStoryPoints: number;
}

export interface CreateProjectPayload {
  ProjectName: string;
  StartDate: string;
  EndDate: string;
  InvolvedUsers: string[];
}
