import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  GET_USER_POSTS,
  HANDLE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_POST,
  CLEAR_POST,
} from "./types";
import { DELETE_PROFILE } from "../profile/types";

const initialState = {
  post: null,
  posts: [],
  userPosts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };
    case HANDLE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, comments: payload.comments }
            : post
        ),
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_PROFILE:
      return {
        ...state,
        post: null,
        posts: [],
        userPosts: [],
        loading: true,
      };
    default:
      return state;
  }
}
