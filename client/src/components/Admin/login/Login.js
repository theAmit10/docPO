import "./style.css";

import { AppBar, Button, Container, Typography } from "@material-ui/core";

import { useState } from "react";

import axios from "axios";

const Login = ({ setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/admin/auth/login", {
        email: email,
        password: password,
      }).then(response => {
        if (Object.keys(response.data).length != 17) {
          setAdmin(response.data)
        } else {
          alert(response.data)
        }
      })
      .catch((err) => console.log(err.message));

  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="primary">
        <Typography variant="h2" align="center" >
          My Doc
        </Typography>
      </AppBar>
      <Container maxWidth="xl">
        <form onSubmit={auth}>
          <label>Email</label>
          <br />
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email"
            name="email"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Your Password"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={{
              marginLeft: "0px",
            }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default Login;
