import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import "./Login.css"; // Stil dosyası için

const Login = () => {
  return (
    <div className="login-page">
      <div style={{ width: "800px" }} className="login-card">
        <div className="logo">
          <img
            style={{ width: "200px", height: "120px" }}
            src="/logo.png"
            alt="Logo"
          />
        </div>
        <div className="login-content">
          <div className="login-form">
            <h2>Login</h2>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <InputText id="username" placeholder="Enter username" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                feedback={false}
                placeholder="Enter password"
              />
            </div>

            <Button
              label="Login"
              className="p-button-rounded p-button-primary"
            />
          </div>

          <Divider layout="vertical" className="divider" />

          <div className="register-section">
            <h2>Not a member?</h2>
            <Button
              label="Register"
              className="p-button-rounded p-button-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
