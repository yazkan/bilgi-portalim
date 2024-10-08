import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <divs className="container">
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
              <InputText id="username" placeholder="Kullanıcı adını giriniz" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Şifre</label>
              <Password
                id="password"
                feedback={false}
                placeholder="Şifrenizi giriniz"
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
    </divs>
  );
};

export default Login;
