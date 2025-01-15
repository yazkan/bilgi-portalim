import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import newRequest from "../utils/newRequest";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/login", {
        username: username,
        password: password,
      });
      console.log("Login response:");

      console.log(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data["user"] ? res.data["user"] : null)
      );
      navigate("/dashboard");
    } catch (err) {
      console.log("Error: " + err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="login-card">
          <div className="logo">
            <img
              style={{ width: "200px", height: "120px" }}
              src="/logo.png"
              alt="Logo"
            />
          </div>
          <div className="login-content">
            <div className="login-form">
              <h2 className="text-primary">Giriş Yap</h2>
              <div className="input-group">
                <label htmlFor="username">Kullanıcı Adı</label>
                <InputText
                  id="username"
                  placeholder="Kullanıcı adını giriniz"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Şifre</label>
                <Password
                  id="password"
                  feedback={false}
                  placeholder="Şifrenizi giriniz"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                style={{ width: "150px" }}
                icon="pi pi-sign-in"
                label="Giriş Yap"
                className="p-button-rounded p-button-primary"
                size="small"
                iconPos="right"
              />
            </div>

            <Divider layout="vertical" className="divider" />

            <div className="register-section">
              <h2 className="text-color-secondary">Henüz üye değil misiniz?</h2>
              <Link to="/register">
                <Button
                  style={{ width: "150px" }}
                  label="Kayıt Ol"
                  icon="pi pi-user-plus"
                  className="p-button-rounded p-button-help"
                  size="small"
                ></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
