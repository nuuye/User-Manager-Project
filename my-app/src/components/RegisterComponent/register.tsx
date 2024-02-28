import React from "react";
import styles from "./register.module.scss";
import { Button, TextField } from "@mui/material";

type Props = {};

function Register(props: Props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verificationPassword, setVerificationPassword] = React.useState("");
  const [message, setMessage] = React.useState("Create account");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleAccount = async () => {
    if (password === verificationPassword) {
      try {
        const response = await fetch("http://localhost:3000/login/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          setMessage("Account created!");
        } else {
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const IdenticalPasswords = () => {
    if (
      !submitted ||
      password.length === 0 ||
      verificationPassword.length === 0
    )
      return true;
    else
      return (
        password === verificationPassword &&
        password.length > 0 &&
        verificationPassword.length > 0
      );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.Title}>Register a new account:</h1>
      <form
        className={styles.formContainer}
        onSubmit={async (e) => {
          // When the form is submitted
          e.preventDefault(); // Prevents the page from refreshing
          setSubmitted(true);
          handleAccount();
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
        <TextField
          id="verificationPassword-basic"
          type="password"
          label="confirm password"
          variant="standard"
          onChange={(e) => setVerificationPassword(e.target.value)}
        />
        <span className={styles.passwordErrorMessage}>
          {submitted && !IdenticalPasswords()
            ? "Passwords are not matching"
            : ""}
        </span>
        <Button variant="contained" type="submit">
          {message}
        </Button>
      </form>
    </div>
  );
}

export default Register;
