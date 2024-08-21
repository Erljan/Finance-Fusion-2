import { Form } from "../components/Form";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login-page">
      <img src="assets/logo1.png" alt="" />
      <div className="login-form">
      <Form route="api/token/" method="login" />
      <p>
        <Link to="/register" className="log">Create an account </Link>
      </p>

      </div>
    </div>
  );
};
