import { SET_VIDEO_INFO, GET_VIDEO_INFO } from "./HomeTypes";

const initialState = {
  videoinfo: {},
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_INFO:
      return {
        ...state,
        videoinfo: action.payload
      };
    case GET_VIDEO_INFO:
      return state.videoinfo;
    default:
      return state;
  }
};
