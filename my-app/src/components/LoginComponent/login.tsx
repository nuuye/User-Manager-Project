import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./login.module.scss";
import { useRouter } from "next/router";

type Props = {};

function Login(props: Props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageColor, setMessageColor] = React.useState("red");
  const [loginStatus, setLoginStatus] = React.useState(false);
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleLoginClick = () => {
    if (loginStatus) {
      setTimeout(() => {
        router.push("/panel");
      }, 1000);
    }
    setLoginStatus(false);
  };

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
        setLoginStatus(true);
        // Do something with the user data if needed
      } else {
        setMessage(data.message || "Failed to login");
        setMessageColor("red");
        setLoginStatus(false);
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
    <div className={styles.Login}>
      <div className={styles.LoginContainer}>
        <h1 className={styles.Title}>Please log in to your account:</h1>
        <form
          className={styles.formContainer}
          onSubmit={async (e) => {
            // When the form is submitted
            e.preventDefault(); // Prevents the page from refreshing
            await handleLogin();
            handleLoginClick();
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
            LOGIN
          </Button>
        </form>
        <p className="invalidContainer" style={{ color: messageColor }}>
          {message}
        </p>
      </div>
      <p className={styles.registerContainer}>
        Don't have an account?{" "}
        <Button onClick={handleRegisterClick} className="registerWord">
          Register
        </Button>
      </p>
    </div>
  );
}

export default Login;
