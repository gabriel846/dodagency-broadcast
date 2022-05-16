// Packages
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

// Custom hooks
import { useWindowSize } from "../../hooks";

// Components
import { Logo } from "../Logo/Logo";
import { NavLink } from "../NavLink";
import { UserAvatar } from "../UserAvatar/UserAvatar";

// Theme
import { signOutUser } from "../../environment/firebase/firebase-methods";
import { USER_AVATAR_TOPBAR_STYLE } from "../../environment/theme/Variables";

// Stylings
import {
  StyledHamburgerIconClosed,
  StyledHamburgerIconOpen,
  StyledNavbar,
} from "./Topbar.style";

export function Topbar(props) {
  const { authenticatedUser } = props;
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [viewportWidth] = useWindowSize();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isSmallScreen = viewportWidth <= 992;

  const redirectToPageHandler = (route) => {
    if (location.pathname !== route) {
      history.push(route);
    }
  };

  const closeNavbarHandler = () => {
    if (isNavbarExpanded) {
      setIsNavbarExpanded(false);
    }
  };

  const toggleNavbarHandler = () =>
    setIsNavbarExpanded((prevState) => !prevState);

  return (
    <StyledNavbar
      collapseOnSelect
      expand="lg"
      expanded={isNavbarExpanded}
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          onClick={() => {
            closeNavbarHandler();
            redirectToPageHandler("/");
          }}
        >
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => toggleNavbarHandler()}
          style={{ border: "none", color: "transparent" }}
        >
          <span>
            {isNavbarExpanded ? (
              <StyledHamburgerIconOpen />
            ) : (
              <StyledHamburgerIconClosed />
            )}
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!!!authenticatedUser && (
              <NavLink
                active={location.pathname === "/authentication"}
                onClick={() => {
                  closeNavbarHandler();
                  redirectToPageHandler("/authentication");
                }}
              >
                Authentication
              </NavLink>
            )}
            {!!authenticatedUser && (
              <NavLink
                active={location.pathname === "/favorite-movies"}
                onClick={() => {
                  closeNavbarHandler();
                  redirectToPageHandler("/favorite-movies");
                }}
              >
                Favorite movies
              </NavLink>
            )}
            {!!authenticatedUser && isSmallScreen && (
              <NavLink
                onClick={() => {
                  closeNavbarHandler();
                  redirectToPageHandler("/profile");
                }}
              >
                Profile
              </NavLink>
            )}
            {!!authenticatedUser && (
              <NavLink
                onClick={() => {
                  signOutUser(dispatch);

                  if (
                    location.pathname === "/favorite-movies" ||
                    location.pathname === "/profile"
                  ) {
                    history.push("/");
                  }
                }}
              >
                Sign out
              </NavLink>
            )}
            {!!authenticatedUser && !isSmallScreen && (
              <NavLink>
                <UserAvatar
                  onClick={() => {
                    closeNavbarHandler();
                    redirectToPageHandler("/profile");
                  }}
                  style={USER_AVATAR_TOPBAR_STYLE}
                  user={authenticatedUser}
                />
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}
