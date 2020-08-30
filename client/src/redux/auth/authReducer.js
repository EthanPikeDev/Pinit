import {
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";
import { DELETE_PROFILE } from "../profile/types";

const initialState = {
  token: "",
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAILD:
    case LOGIN_FAILD:
    case AUTH_ERROR:
    case DELETE_PROFILE:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        token: null,
      };
    default:
      return state;
  }
}
