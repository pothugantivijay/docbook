import React, { useState, useEffect, FormEvent } from "react";
import "./Css/login.css";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (localStorage.getItem("Type")) {
    window.location.href = "/profile";
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      localStorage.setItem("Type", data);

      setLoginSuccess(true);
      setError(null);
      window.location.href = "/profile";
    } catch (error) {
      console.error("Login error:", (error as Error).message);

      setError("Username or Password is invalid");
    }
  };

  return (
    <div className="body">
      <div className="headingContainer">
        <div className="docHeading">DocBook</div>
      </div>
      <div className="centerWrap">
        {error && (
          <div className="alert alert-danger alert-top" role="alert">
            {error}
          </div>
        )}
        <div className="containerWrap glassEffect">
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="loginText">Account Login</div>
            <label htmlFor="username">Username</label>
            <div className="underline-input">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="underline-input">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="alignButton">
              <button type="submit">Login</button>
            </div>
            <label>New user?</label>
          </form>
          <div className="registerContainer">
            <div className="patient">
              <a href="../registerpatient/">Register as a patient</a>
            </div>
            <div className="doctor">
              <a href="#">Register as a doctor</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
