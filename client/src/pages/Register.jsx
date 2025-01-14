import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import "primeflex/primeflex.css";
import newRequest from "../utils/newRequest";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    type: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user", user);
    try {
      await newRequest.post("/register", {
        username: user.username,
        password: user.password,
        name: user.name,
        type: user.type,
      });
      navigate("/login");
    } catch (err) {
      console.log("Error: " + err.response.data.error);
    }
  };

  return (
    <div className="container">
      <Card title="Kayıt Ol" className="p-fluid" style={{ width: "400px" }}>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Kullanıcı Bilgileri</label>
            <InputText
              required
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Adınızı ve Soyadınızı giriniz"
            />
          </div>
          <div className="field">
            <label htmlFor="username">Kullanıcı Adı</label>
            <InputText
              required
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="Kullanıcı Adınızı giriniz"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Şifre</label>
            <Password
              required
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Şifrenizi giriniz"
              toggleMask
              feedback={false}
            />
          </div>
          <div className="field">
            <label>
              Hangi kullanıcı tipinde kayıt oluşturmak istiyorsunuz?
            </label>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="student"
                name="type"
                value="0"
                onChange={handleChange}
                checked={user.type == 0}
              />
              <label htmlFor="student"> Öğrenci</label>
            </div>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="teacher"
                name="type"
                value="1"
                onChange={handleChange}
                checked={user.type == 1}
              />
              <label htmlFor="teacher"> Öğretmen</label>
            </div>
          </div>
          <div className="field">
            <Button
              label="Kayıt Ol"
              icon="pi pi-user-plus"
              className="p-button-rounded w-full"
              type="submit"
            />
          </div>
          <p>
            Zaten bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;
