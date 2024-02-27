import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./login.scss";

type Props = {};

function Login(props: Props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageColor, setMessageColor] = React.useState("red");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login/try", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful");
        setMessageColor("green");
        // Do something with the user data if needed
      } else {
        setMessage(data.message || "Failed to login");
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("An error occurred");
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    console.log("username:", username);
    console.log("password", password);
  }, [password, username]);

  return (
    <div className="Login">
      <div className="LoginContainer">
        <h1 className="Title">Please log in to your account:</h1>
        <form
          className="formContainer"
          onSubmit={async (e) => {
            // When the form is submitted
            e.preventDefault(); // Prevents the page from refreshing
            await handleLogin();
          }}
        >
          <TextField
            id="username-basic"
            label="username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password-basic"
            type="password"
            label="password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">
            log in
          </Button>
        </form>
        <p className="invalidContainer" style={{ color: messageColor }}>
          {message}
        </p>
      </div>
      <p className="registerContainer">
        Don't have an account? <span className="registerWord">Register</span>
      </p>
    </div>
  );
}

export default Login;
