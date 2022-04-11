import axios from "axios";
import { config } from "react-transition-group";
import { returnErrors } from "./errorAction";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// func > login function
// require> email password
// return  > error or success
//route /auth
export const login = ({ email, password }) => (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = { email, password };

  axios
    .post("/auth", { body }, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// func > louout function
// desc> remove token form local storage
// require > nothing on clock logout
//route /
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// func > register function
// desc> insert token to  local storage and insert data to users document
// require > username,email,password
//route /users
export const register = ({ username, email, password }) => (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = { username, email, password };
  axios
    .post("/users/", { body }, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// func > loadUser function
// desc> check token available or not in localstorage if availabe login automatically
// require > localstorage token
//route auth/user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/auth/user", config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
