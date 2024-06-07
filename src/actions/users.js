import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  users: [],
  loading: false,
};
export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => ({ ...state, users: [...payload] }),
  },
});
export const { setUsers } = usersSlice.actions;

export const getUsers = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get("/User/list", { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data?.docs);
  dispatch(setUsers(data));
  dispatch(stopLoading());
};
export default usersSlice.reducer;
