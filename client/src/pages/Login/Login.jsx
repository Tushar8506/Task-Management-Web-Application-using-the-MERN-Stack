import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
// styles.
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  //Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful");

        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");

        setIsActive(false); // Switch to login form
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-dvh justify-center items-center">
      <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
        {/* Login Form */}

        <div className={`${styles["form-box"]} ${styles.login}`}>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className={styles["input-box"]}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className={`${styles.bx} ${styles["bxs-user"]}`}></i>
            </div>

            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className={`${styles.bx} ${styles["bxs-lock-alt"]}`}></i>
            </div>

            <div className={styles["forgot-link"]}>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.btn}>
              Login
            </button>
            <p>or login with social platforms</p>
            <div className={styles["social-icons"]}>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-google"]}`}></i>
              </a>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-facebook"]}`}></i>
              </a>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-github"]}`}></i>
              </a>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-linkedin"]}`}></i>
              </a>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className={`${styles["form-box"]} ${styles.register}`}>
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>

            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="Username"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />
              <i className={`${styles.bx} ${styles["bxs-user"]}`}></i>
            </div>

            <div className={styles["input-box"]}>
              <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
              <i className={`${styles.bx} ${styles["bxs-envelope"]}`}></i>
            </div>

            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <i className={`${styles.bx} ${styles["bxs-lock-alt"]}`}></i>
            </div>

            <button type="submit" className={styles.btn}>
              Register
            </button>
            <p>or register with social platforms</p>
            <div className={styles["social-icons"]}>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-google"]}`}></i>
              </a>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-facebook"]}`}></i>
              </a>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-github"]}`}></i>
              </a>
              <a href="#">
                <i className={`${styles.bx} ${styles["bxl-linkedin"]}`}></i>
              </a>
            </div>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className={styles["toggle-box"]}>
          <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button
              className={`${styles.btn} ${styles["register-btn"]}`}
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>

          <div
            className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
          >
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              className={`${styles.btn} ${styles["login-btn"]}`}
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
