import { Form } from "../components/Form";
import { Link } from "react-router-dom";


export const Register = () => {
  return (
    <div className="login-page">
      <div className="login-form">

        <Form route="api/user/register/" method="register" />
        <p>Already have an account? <Link to="/login" className="log">Log-in</Link></p>
      </div>
    </div>
  )
}
