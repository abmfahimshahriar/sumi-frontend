export interface IUser {
  UserId?: string;
  Name?: string;
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
  username?: string;
  userId: string;
  token: string;
  isAuthenticated: boolean;
  hasAuthErrors: boolean;
  authErrors: string[];
  authSuccessMessage: string;
  userDetails: UserProfile;
  notifications: Notification[],
}

export interface UserProfile {
  _id: string;
  Name: string;
  Email: string;
  ProfileImageUrl: string;
}

export interface UsersListItem {
  _id: string;
  Email: string;
  Name: string;
  IsSelected: boolean;
  ProfileImageUrl?: string;
}
export interface ProjectState {
  myCreatedProjects: Project[];
  myInvolvedProjects: Project[];
  hasProjectErrors: boolean;
  projectErrors: string[];
  usersList: UsersListItem[];
}

export interface SprintState {
  sprints: Sprint[];
  sprintErrors: string[];
  hasSprintErrors: boolean;
  projectDetails: Project;
}

export interface TaskState {
  fullTaskList: Task[];
  tasks: Task[];
  SprintDetails: Sprint;
  taskErrors: string[];
  hasTaskErrors: boolean;
  comments: Comment[];
  searchText: string;
  usersList: UsersListItem[];
  projectDetails: Project;
}

export interface UIState {
  localLoading: boolean;
  globalLoading: boolean;
  createdProjectLoading: boolean;
  involvedProjectLoading: boolean;
  notificationLoading: boolean;
}

export interface DispatchActionTypes {
  type: string;
  payload?: any;
}

export interface IUserMapStateToProps {
  user: UserState;
  ui: UIState;
}

export interface IProjectMapStateToProps {
  project: ProjectState;
  ui: UIState;
}

export interface ISprintMapStateToProps {
  sprint: SprintState;
  ui: UIState;
}

export interface ITaskMapStateToProps {
  task: TaskState;
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
  InvolvedUsers: UsersListItem[];
}

export interface Sprint {
  _id: string;
  ProjectId: string;
  SprintName: string;
  StartDate: string;
  EndDate: string;
  CreatedBy: string;
  TotalStoryPoints: number;
  CompletedStoryPoints: number;
  TaskBuckets: TaskBucket[];
  StartBucket: string;
  EndBucket: string;
}

export interface Task {
  _id: string;
  ProjectId: string;
  SprintId: string;
  TaskName: string;
  TaskDescription: string;
  StartDate: string;
  EndDate: string;
  CreatedBy: string;
  StoryPoints: number;
  CurrentBucket: string;
  Assignee: Assignee;
  IsDone: boolean;
}

export interface Assignee {
  _id?: string;
  Name: string;
  Email: string;
}

export interface TaskBucket {
  _id?: string;
  TaskBucketId: string;
  TaskBucketName: string;
}

export interface CreateProjectPayload {
  ProjectName: string;
  StartDate: string;
  EndDate: string;
  InvolvedUsers: UsersListItem[];
}

export interface CreateSprintPayload {
  ProjectId: string;
  SprintName: string;
  StartDate: string;
  EndDate: string;
  TaskBuckets: TaskBucket[];
  StartBucket?: string;
  EndBucket?: string;
  SprintId?: string;
}

export interface ChangeBucketPayload {
  TaskId: string;
  NewBucket: string;
}

export interface CreateTaskPayload {
  ProjectId: string;
  SprintId: string;
  TaskName: string;
  TaskDescription: string;
  StartDate: string;
  EndDate: string;
  StoryPoints: number;
  Assignee: UsersListItem;
}

export interface Comment {
  _id: string;
  ProjectId: string;
  SprintId: string;
  TaskId: string;
  Commenter: Assignee;
  CommentContent: string;
  CommentedAt: string;
}

export interface CreateCommentPayload {
  ProjectId: string;
  SprintId: string;
  TaskId: string;
  CommentContent?: string;
}

export interface Notification {
  _id: string;
  ProjectId: string;
  SprintId: string;
  TaskId: string;
  TaskName:string;
  SenderId: string;
  SenderName: string;
  ReceiverId: string;
  ReceiverName: string;
  Action: string;
  CreatedAt: string;
  UnreadStatus: boolean;
}
