import React from "react";
import "./App.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isInvalid, setIsInvalid] = React.useState(false);

  const verifyUser = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login/try", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.status === 200) return true;
      else return false;
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              const isValid = await verifyUser(username, password);
              setIsInvalid(!isValid);
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
          <p
            className="invalidContainer"
            style={{ display: isInvalid ? "block" : "none" }}
          >
            Invalid username or password, try again
          </p>
          <p
            className="validContainer"
            style={{ display: isInvalid ? "none" : "block" }}
          >
            Successfuly logged
          </p>
        </div>
        <p className="registerContainer">
          Don't have an account? <span className="registerWord">Register</span>
        </p>
      </header>
    </div>
  );
}

export default App;
