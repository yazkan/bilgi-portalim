import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card title="Register" className="p-fluid" style={{ width: "400px" }}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText id="email" type="email" placeholder="Email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <Password id="password" toggleMask feedback={false} />
        </div>
        <div className="field">
          <Button label="Register" icon="pi pi-user-plus" className="w-full" />
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
