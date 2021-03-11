import React, { FormEvent, useState } from "react";
import { connect } from "react-redux";
import { IMapStateToProps, IUser } from "../../interfaces/GlobalTypes";
import { loginUser } from "../../store/actions/userActions";

type Props = {
  loginUser: Function;
};
const LoginPage: React.FC<Props> = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
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

export default connect(mapStateToProps, mapActionToProps)(LoginPage);
