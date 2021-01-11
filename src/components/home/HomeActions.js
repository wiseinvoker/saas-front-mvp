import axios from "axios";
import Cookies from 'js-cookie';
import { push } from "connected-react-router";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";
import { GET_VIDEO_INFO, SET_VIDEO_INFO } from "./HomeTypes";
import { toastOnError } from "../../utils/Utils";

// const API_URL = "http://sheltered-eyrie-96953.herokuapp.com";
// const API_URL = "http://localhost:8000";

const headers = {
  // 'Access-Control-Allow-Origin': '*',
  // 'content-type': 'application/x-www-form-urlencoded',
  // 'X-CSRFToken': Cookies.get('csrftoken'),
};

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

export const getVideoInfo = (userData, redirectTo) => dispatch => {
  axios
    .get("/ytvideo-info/", { 
      params: userData,
     })
    .then(response => {
      const video_info = response.data;
      console.log("VideoInfo: ", video_info);
      localStorage.setItem("videoinfo", JSON.stringify(video_info));
      dispatch(setVideoInfo(video_info, redirectTo));
    })
    .catch(error => {
      // dispatch(unsetCurrentUser());
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

export const readVideoInfo = (data) => dispatch => {
  dispatch({
    type: GET_VIDEO_INFO,
  });
};
