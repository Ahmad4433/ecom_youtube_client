import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    userId: "",
    role: null,
    email: "",
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
