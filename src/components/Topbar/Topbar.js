// Packages
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

// Components
import { StyledNavLink } from "../NavLink";

// Variables
import { APP_NAME } from "../../environment/theme/Variables";

export function Topbar() {
  const history = useHistory();
  const location = useLocation();

  const redirectToPageHandler = (route) => {
    if (location.pathname !== route) {
      history.push(route);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => redirectToPageHandler("/")}>
          {APP_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => redirectToPageHandler("/")}>Home</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => redirectToPageHandler("/authentication")}>
              Authentication
            </Nav.Link>
            <Nav.Link onClick={() => redirectToPageHandler("/favorite-movies")}>
              Favorite movies
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
            <Nav.Link href="#signout">Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
