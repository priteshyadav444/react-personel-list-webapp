import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { logout } from "../../action/authAction";
import { clearList } from "../../action/itemAction";

export const Logout = ({ logout, clearList }) => {
  const handleLogout = () => {
    logout();
    clearList();
  };
  return (
    <Fragment>
      <NavLink onClick={handleLogout} className="text-white">
        Logout
      </NavLink>
    </Fragment>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  clearList: PropTypes.func.isRequired,
};

export default connect(null, { logout, clearList })(Logout);
