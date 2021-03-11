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
  userId?: string;
  email: string;
  password: string;
  token: string;
}

export interface DispatchActionTypes {
  type: string;
  payload: any;
}

export interface IMapStateToProps {
  user?: UserState;
}
export type DispatchType = (args: UserAction) => UserAction;
