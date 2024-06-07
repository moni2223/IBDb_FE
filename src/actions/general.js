import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { User } from "../utilities/User";
// import { startLoading, stopLoading } from "./general";

const initialState = {
  user: {},
  roles: [],
  loading: false,
  loadingText: "Моля изчакайте...",
};
export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => ({ ...state, user: payload }),
    startLoading: (state) => ({ ...state, loading: true }),
    stopLoading: (state) => ({ ...state, loading: false }),
    setRoles: (state, { payload }) => ({ ...state, roles: payload }),
  },
});
export const { setUser, startLoading, stopLoading, setRoles } = generalSlice.actions;

export const loginRequest = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("/User/login", payload);
  User.authenticate(data?.token, {
    token: data?.token,
    ...data,
  });
  dispatch(setUser(data?.user));
  if (payload?.onSuccess) payload?.onSuccess(data);

  dispatch(stopLoading());
};
export const registerRequest = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("/User/register", { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const checkUser = (payload) => async (dispatch) => {
  if (payload?.id) dispatch(setUser(payload));
  else logoutUser();
};
export const getRoles = () => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get("/Role/list");
  dispatch(setRoles(data));
  dispatch(stopLoading());
};
export const logoutUser = (payload) => async (dispatch) => {
  window.localStorage.clear();
  window.location.href = "/";
  dispatch(setUser({}));
};

export default generalSlice.reducer;
