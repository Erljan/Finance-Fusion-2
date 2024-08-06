import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { ProtectedRoute } from "./components/ProtectedRoute"

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={
            <ProtectedRoute >
              <Home/>
            </ProtectedRoute>
            }>

          </Route>
          <Route path="/login" element={ <Login/>} />
          <Route path="/logout" element={ <Logout/>} />
          <Route path="/register" element={ <Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
