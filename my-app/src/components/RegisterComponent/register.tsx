import React from "react";
import styles from "./register.module.scss";
import { Button, TextField } from "@mui/material";

type Props = {};

function Register(props: Props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verificationPassword, setVerificationPassword] = React.useState("");

  return (
    <div className={styles.container}>
      <h1 className={styles.Title}>Register a new account:</h1>
      <form
        className={styles.formContainer}
        onSubmit={async (e) => {
          // When the form is submitted
          e.preventDefault(); // Prevents the page from refreshing
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
        <Button variant="contained" type="submit">
          Create account
        </Button>
      </form>
    </div>
  );
}

export default Register;
