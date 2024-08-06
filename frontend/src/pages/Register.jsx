import { Form } from "../components/Form";
import { Link } from "react-router-dom";


export const Register = () => {
  return (
    <div>
        <Form route="api/user/register/" method="register" />
        <p>Already have an account? <Link to="/login">Log-in</Link></p>
    </div>
  )
}
