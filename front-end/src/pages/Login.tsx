import React, { useState } from "react";
import "./Login.css";
import Header from "../components/Header";
import { login } from "../api/AuthService";
import api from "../api/api";

const Login: React.FC = () => {
  // State for login form
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // State for registration form
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ username, password });
      console.log("Login Successful:", response);
      alert("Login Successful");
    } catch (err: any) {
      console.error(err);
      setError(err);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      console.log("Registering with", {
        email: registerEmail,
        username: registerUsername,
        password: registerPassword,
      });

      const response = await api.post("/auth/register", {
        email: registerEmail,
        username: registerUsername,
        password: registerPassword,
      });
      alert("Registration Successful");
    } catch (err: any) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div>
      <Header />
      <h1 className="page-title">Login/Register</h1>
      <div className="login-page">
        <div className="main-container">
          <div className="form-section">
            {/* Login Form */}
            <div className="login-form">
              <h2>Log into your account</h2>
              <form onSubmit={handleLoginSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">LOG IN</button>
              </form>
            </div>

            {/* Register Form */}
            <div className="register-form">
              <h2>Register a new account</h2>
              <form onSubmit={handleRegisterSubmit}>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button type="submit">REGISTER</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
