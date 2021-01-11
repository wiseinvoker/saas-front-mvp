import axios from "axios";
import Cookies from 'js-cookie';
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { GET_VIDEO_INFO, SET_VIDEO_INFO } from "./VideoDetailTypes";
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

export const setVideoInfo = (userData) => dispatch => {
  console.log('Calling api...');
  axios
    .get("/ytvideo-info/", { 
      params: userData,
     })
    .then(response => {
      const video_info = response.data;
      dispatch({
        type: SET_VIDEO_INFO,
        payload: video_info,
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const readVideoInfo = (data) => dispatch => {
  dispatch({
    type: GET_VIDEO_INFO,
  });
};
