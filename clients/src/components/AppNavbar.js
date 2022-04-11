import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import { loadUser } from "../action/authAction";

const AppNavbar = ({ auth, loadUser }) => {
  const authLinks = (
    <>
      <NavItem>
        <span className="navbar-text mr-3 text-white">
          <strong>
            {auth && auth.user ? `Welcome ${auth.user.username}` : ""}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );
  const guestLinks = (
    <>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </>
  );
  return (
    <>
      <Navbar dark expand="sm" className="mb-5 bg-primary">
        <Container>
          <NavbarBrand href="/">YourList</NavbarBrand>

          <Nav className="ml-auto">
            {auth.isAutenticated ? authLinks : guestLinks}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
AppNavbar.propTypes = {
  loadUser: PropTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStatetoProps, { loadUser })(AppNavbar);
