import React, { FormEvent, useState } from "react";
import "./Login.css";
// redux stuff
import { connect } from "react-redux";
import { IMapStateToProps, IUser } from "../../../interfaces/GlobalTypes";
import { loginUser } from "../../../store/actions/userActions";

//MUI stuff
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type Props = {
  loginUser: Function;
};
const Login: React.FC<Props> = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: IUser = {
      Email: email,
      Password: password,
    };
    loginUser(userData);
  };
  return (
    <div className="login-card">
      <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-item">
          <TextField
            className="full-width"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
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
            Login
          </Button>
          {/* <button type="submit">Login</button> */}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: IMapStateToProps) => ({
  user: state.user,
});

const mapActionToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionToProps)(Login);
