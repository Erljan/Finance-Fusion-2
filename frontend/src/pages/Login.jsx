import { Form } from "../components/Form"
import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <div>
    <Form route="api/token/" method="login" />
    <p><Link to="/register">Create an account </Link></p>
</div>
  )
}
