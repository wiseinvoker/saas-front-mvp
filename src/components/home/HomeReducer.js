import { SET_VIDEO_INFO, CLEAR_VIDEO_INFO, SET_BUTTON_TITLE } from "./HomeTypes";

const initialState = {
  videoinfo: {},
  buttontitle: "Search",
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
        ...state,
        videoinfo: {},
      };
    case SET_BUTTON_TITLE:
      return {
        ...state,
        buttontitle: action.payload,
      };
    default:
      return state;
  }
};
