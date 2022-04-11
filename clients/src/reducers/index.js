import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducers";
import errorReducer from "./errorReducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  error: errorReducer,
});
