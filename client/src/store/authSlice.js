import { createSlice } from "@reduxjs/toolkit";

const token = sessionStorage.getItem("token")
  ? sessionStorage.getItem("token")
  : null;

const user = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null;

const initialState = {
  user: user,
  token: token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setCurrentUser, setToken } = authSlice.actions;
export default authSlice.reducer;
