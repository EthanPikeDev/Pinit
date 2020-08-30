import { combineReducers } from "redux";
import alert from "./alert/alertReducer";
import auth from "./auth/authReducer";
import profile from "./profile/profileReducer";
import posts from "./post/postReducer";

export default combineReducers({
  alert,
  auth,
  profile,
  posts,
});
