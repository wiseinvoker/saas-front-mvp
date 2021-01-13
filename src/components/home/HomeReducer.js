import { SET_VIDEO_INFO, CLEAR_VIDEO_INFO } from "./HomeTypes";

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
    case CLEAR_VIDEO_INFO:
      return {
        videoinfo: {},
      };
    default:
      return state;
  }
};
