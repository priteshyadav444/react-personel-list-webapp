import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  CLEAR_LIST,
} from "../action/types";
import { returnErrors } from "./errorAction";

//func > getitems
//desc > get all items
//roure > /items
export const getItems = () => (dispatch, getState) => {
  dispatch(setItemsLoading());

  const authUser = getState().auth.isAutenticated ? getState().auth.user._id:"";
  const config = {
    headers: {
      authuser: authUser,
    },
  };
  axios
    .get("/items", config)
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

//func > deleteitem
//desc > delete  items using id
//roure > /items/delete/:id
export const deleteItem = (id) => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    const authUser = getState().auth.user._id;
    config.headers["x-auth-token"] = token;
    config.headers["authuser"] = authUser;
  }
  axios
    .delete(`/items/delete/${id}`, config)
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

//func > addItem
//desc > addItem  items
//roure > /items/add
export const addItem = (item) => (dispatch, getState) => {
  const token = getState().auth.token;
  const authUser = getState().auth.user._id;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers and adding authUser id

  if (token) {
    config.headers["x-auth-token"] = token;
    item.authUser = authUser;
  }
  axios
    .post("/items/add", item, config)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

//func > setItemsLoading
//desc > set Items Loading  items

export const setItemsLoading = (item) => {
  return {
    type: ITEMS_LOADING,
  };
};
export const clearList = () => {
  return { type: CLEAR_LIST };
};
