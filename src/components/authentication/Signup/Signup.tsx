import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
// redux stuff
import { connect } from "react-redux";
import {
  IUserMapStateToProps,
  IUser,
  UserState,
} from "../../../interfaces/GlobalTypes";
import { signupUser } from "../../../store/actions/userActions";

//MUI stuff
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CustomSnackbar } from "../../../components";
// utility functions
import { inputValidator } from "../../../utility/validators/inputValidator";

type Props = {
  signupUser: Function;
  user: UserState;
};

const Signup: React.FC<Props> = ({ signupUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});
  const [hasAuthErrors, setHasAuthErrors] = useState(user.hasAuthErrors);
  const [authErrors, setAuthErrors] = useState(user.authErrors);
  const [isAuthenticated, setIsAuthenticated] = useState(user.isAuthenticated);
  const [authSuccessMessage, setAuthSuccessMessage] = useState(user.authSuccessMessage);

  useEffect(() => {
    setHasAuthErrors(user.hasAuthErrors);
    setAuthErrors(user.authErrors);
    setIsAuthenticated(user.isAuthenticated);
    setAuthSuccessMessage(user.authSuccessMessage);
  }, [user]);
  const inputs = [
    {
      fieldValue: email,
      fieldName: "email",
      validations: ["required"],
      minLength: 8,
      maxLength: 20,
    },
    {
      fieldValue: password,
      fieldName: "password",
      validations: ["required", "minLength", "maxLength"],
      minLength: 4,
      maxLength: 10,
    },
  ];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsObject = inputValidator(inputs);
    setFormErrors(errorsObject);
    if (!errorsObject.hasError) {
      const userData: IUser = {
        Email: email,
        Password: password,
      };
      signupUser(userData);
    }
  };
  return (
    <div className="signup-card">
      <form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <h1>Sign up</h1>
          <p>Please fillout the following credentials</p>
        </div>
        <div className="form-item">
          <TextField
            className="full-width"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            error={formErrors.email?.errors.length > 0 ? true : false}
            helperText={
              formErrors.email?.errors.length > 0
                ? formErrors.email?.errors[0]
                : null
            }
            onChange={handleInputChange}
          />
        </div>
        <div className="form-item">
          <TextField
            className="full-width"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            error={formErrors.password?.errors.length > 0 ? true : false}
            helperText={
              formErrors.password?.errors.length > 0
                ? formErrors.password?.errors[0]
                : null
            }
            onChange={handleInputChange}
          />
        </div>

        <div className="form-item">
          <Button
            className="full-width-btn"
            variant="contained"
            color="primary"
            type="submit"
          >
            Signup
          </Button>
        </div>
        <div>
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>
      </form>
      {hasAuthErrors && (
        <CustomSnackbar openSnackbar={hasAuthErrors} message={authErrors[0]} type="error"/>
      )}
      {isAuthenticated && (
        <CustomSnackbar openSnackbar={isAuthenticated} message={authSuccessMessage} type="success"/>
      )}
    </div>
  );
};

const mapStateToProps = (state: IUserMapStateToProps) => ({
  user: state.user,
});

const mapActionToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionToProps)(Signup);
