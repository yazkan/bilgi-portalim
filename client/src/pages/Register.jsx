import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "./Login.css";
import "primeflex/primeflex.css";

const Register = () => {
  return (
    <div className="container">
      <Card title="Kayıt Ol" className="p-fluid" style={{ width: "400px" }}>
        <div className="field">
          <label htmlFor="username">Kullanıcı Adı</label>
          <InputText id="username" placeholder="Kullanıcı Adınızı giriniz" />
        </div>
        <div className="field">
          <label htmlFor="password">Şifre</label>
          <Password
            id="password"
            placeholder="Şifrenizi giriniz"
            toggleMask
            feedback={false}
          />
        </div>
        <div className="field">
          <Link to="/">
            <Button
              label="Kayıt Ol"
              icon="pi pi-user-plus"
              className="p-button-rounded w-full"
            />
          </Link>
        </div>
        <p>
          Zaten bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
