import axios from "axios";
import { push } from "connected-react-router";
import { SET_VIDEO_INFO, CLEAR_VIDEO_INFO, SET_BUTTON_TITLE } from "./HomeTypes";
import { toastOnError } from "../../utils/Utils";

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

export const getVideoInfo = (userData) => dispatch => {
  dispatch(setButtonTitle("Loading..."));
  axios
    .get("/ytvideo-info/", { 
      params: userData,
     })
    .then(response => {
      const video_info = response.data;
      localStorage.setItem("videourl", userData.url);
      dispatch(setVideoInfo(video_info));
      dispatch(setButtonTitle("Transcribe Now"));
    })
    .catch(error => {
      // dispatch(unsetCurrentUser());
      dispatch(setButtonTitle("Error"));
      toastOnError(error);
    });
};

export const setVideoInfo = (data, redirectTo) => dispatch => {
  dispatch({
    type: SET_VIDEO_INFO,
    payload: data
  });
  if (redirectTo !== "") {
    dispatch(push(redirectTo));
  }
};

export const clearVideoInfo = () => dispatch => {
  dispatch({
    type: CLEAR_VIDEO_INFO,
  });
};

export const setButtonTitle = (data) => dispatch => {
  dispatch({
    type: SET_BUTTON_TITLE,
    payload: data
  });
};
