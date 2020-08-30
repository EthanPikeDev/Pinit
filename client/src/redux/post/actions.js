import axios from "axios";
import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  POST_ERROR,
  GET_USER_POSTS,
  HANDLE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_POST,
  CLEAR_POST,
} from "./types";
import { setAlert } from "../alert/action";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post/");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/user/${userId}`);
    dispatch({
      type: GET_USER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/post/", formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
    dispatch(getUserPosts(id));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const handleLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/post/like/${id}`);
    dispatch({
      type: HANDLE_LIKES,
      payload: {
        postId: id,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (id, text, full) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/post/comment/${id}`, { text }, config);
    dispatch({
      type: ADD_COMMENT,
      payload: {
        id,
        comments: res.data,
      },
    });

    dispatch(setAlert("Comment Added", "success"));
    if (full) {
      dispatch(getPost(id));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeComment = (id, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${id}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment deleted", "success"));

    dispatch(getPost(id));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    history.push("/posts");
    dispatch(setAlert("Post deleted", "success"));
    dispatch({ type: CLEAR_POST });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearPost = () => (dispatch) => {
  dispatch({
    type: CLEAR_POST,
  });
};
