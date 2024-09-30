import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card title="Login" className="p-fluid" style={{ width: "400px" }}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText id="email" type="email" placeholder="Email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <Password id="password" toggleMask feedback={false} />
        </div>
        <div className="field">
          <Button label="Login" icon="pi pi-sign-in" className="w-full" />
        </div>
        <p>
          Dont have an account? <Link to="/register">Sign up</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
