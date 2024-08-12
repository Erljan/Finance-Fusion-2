import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Stocks } from "./pages/Stocks"
import { NavBar } from "./components/NavBar"
import { NotFoundPage } from "./pages/NotFoundPage"
import './styles/index.css'
// import { WatchlistPage } from "./pages/WatchlistPage"
import { Budget } from "./pages/Budget"


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
            <ProtectedRoute>
              <NavBar/>
              <Home/>

            </ProtectedRoute>
            }>

          </Route>
            <Route path="stock/" element={
              <ProtectedRoute>
                <NavBar/>
                <Stocks/>

              </ProtectedRoute>
            }/>
            <Route path="budget/" element={
              <ProtectedRoute>
                <NavBar/>
                <Budget/>

              </ProtectedRoute>
            }/>
          <Route path="/login" element={ <Login/>} />
          <Route path="/logout" element={ <Logout/>} />
          <Route path="/register" element={ <Register/>} />
          <Route path="*" element={ <NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
