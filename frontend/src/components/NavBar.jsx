import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Search } from './Search';

export function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Finance-Fusion</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/stock">Stocks</Nav.Link>
            <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>

          </Nav>
          <Nav>

          </Nav>
          <Search />
          <Nav className="">
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


    </>
  );
}

