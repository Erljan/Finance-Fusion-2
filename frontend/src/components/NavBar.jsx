// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';
// // import { Search } from './Search';

// export function NavBar() {
//   return (
//     <>
//       <Navbar bg="" className='navbar' data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand as={Link} to="/"><img className='logo' src="src/images/logo1.png" alt="" /></Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
//             <Nav.Link as={Link} to="/budget">Budget</Nav.Link>
//             <Nav.Link as={Link} to="/stock">Stocks</Nav.Link>
//             <Nav.Link as={Link} to="/chatbot">Ask AI</Nav.Link>

//           </Nav>
//           <Nav>

//           </Nav>
//           <Nav className="">
//             <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>


//     </>
//   );
// }

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


export function NavBar() {
  return (
    <Navbar expand="lg" className="navbar" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/"><img className='logo' src="assets/logo1.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/budget">Budget</Nav.Link>
            <Nav.Link as={Link} to="/stock">Stocks</Nav.Link>
            <Nav.Link as={Link} to="/chatbot">Ask AI</Nav.Link>
            <NavDropdown title="Logout" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

