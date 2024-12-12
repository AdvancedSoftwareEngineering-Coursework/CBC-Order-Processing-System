import React, { useState } from "react";
import "./StaffLogin.css"; // Use the updated CSS file
import Header from "../components/Header";

const StaffLogin: React.FC = () => {
  // State for login form
  const [staffEmail, setStaffEmail] = useState<string>("");
  const [staffPassword, setStaffPassword] = useState<string>("");

  // Handle login form submission
  const handleStaffLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Logging in as staff with", staffEmail, staffPassword);

  };

  return (
    <div className="login-page">
      <Header />
      <main className="main-container">
        <h2 className="page-title">Employee Portal</h2>
        <div className="form-image-container">
          <div className="login-form">
            <h3>Log into your account</h3>
            <form onSubmit={handleStaffLoginSubmit}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
              />
              <button type="submit">LOG IN</button>
            </form>
          </div>

          
          <div className="staff-image">
            <img
              src="https://blog.ezclocker.com/wp-content/uploads/2021/05/training-cleaning-staff-1024x683.jpg"
              alt="Staff Image"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffLogin;
