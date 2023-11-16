import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    writeNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null
    },
  },
});

export const { writeNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (text, time) => {
  return (dispatch) => {
    dispatch(writeNotification(text));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
