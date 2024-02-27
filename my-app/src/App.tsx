import React, { useEffect } from "react";
import "./App.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

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
        // Do something with the user data if needed
      } else {
        setMessage(data.message || "Failed to login");
      }
    } catch (error) {
      setMessage("An error occurred");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("username:", username);
    console.log("password", password);
  }, [password, username]);

  return (
    <div className="App">
      <header className="App-header">
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
              label="password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" type="submit">
              log in
            </Button>
          </form>
          <p className="invalidContainer">{message}</p>
        </div>
        <p className="registerContainer">
          Don't have an account? <span className="registerWord">Register</span>
        </p>
      </header>
    </div>
  );
}

export default App;
