import React, { useState } from "react";
import Input from "./common/input";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Joi from "joi-browser";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "400px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
      width: "400px",
    },
  },
}));

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const classes = useStyles();
  const dbUsername = "saif@gmail.com";
  const dbPassword = "12345";

  const schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const { error } = Joi.validate(user, schema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    error.details.map((error) => (errors[error.path[0]] = error.message));
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const terrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) terrors[input.name] = errorMessage;
    else delete terrors[input.name];

    const tuser = { ...user };
    tuser[input.name] = input.value;
    setUser(tuser);
    setErrors(terrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);

    if (user.username !== dbUsername || user.password !== dbPassword)
      return toast.error("Incorrect Username or Password");

    const jwt = authService.login(user.username, user.password);

    // props.history.push("/");
    window.location.href = "/";
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Input
        label="Username"
        error={errors && errors.username}
        id="username"
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <Input
        label="Password"
        error={errors && errors.password}
        id="password"
        type="password"
        name="password"
        value={user.paswword}
        onChange={handleChange}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
