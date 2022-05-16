// Packages
import React from "react";
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
import { StyledNavbar } from "./Topbar.style";

export function Topbar(props) {
  const { authenticatedUser } = props;

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

  return (
    <StyledNavbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => redirectToPageHandler("/")}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ borderColor: "red", color: "red" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!!!authenticatedUser && (
              <NavLink
                active={location.pathname === "/authentication"}
                onClick={() => redirectToPageHandler("/authentication")}
              >
                Authentication
              </NavLink>
            )}
            {!!authenticatedUser && (
              <NavLink
                active={location.pathname === "/favorite-movies"}
                onClick={() => redirectToPageHandler("/favorite-movies")}
              >
                Favorite movies
              </NavLink>
            )}
            {!!authenticatedUser && isSmallScreen && (
              <NavLink onClick={() => redirectToPageHandler("/profile")}>
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
                  onClick={() => redirectToPageHandler("/profile")}
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
