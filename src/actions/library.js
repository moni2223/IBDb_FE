import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../utilities/httpClient";
import { startLoading, stopLoading } from "./general";

const initialState = {
  books: {},
  personalBooks: [],
  current: {},
  reviews: [],
  genres: [],
  loading: false,
};
export const librarySlice = createSlice({
  name: "librarySlice",
  initialState,
  reducers: {
    setBooks: (state, { payload }) => ({
      ...state,
      books: {
        ...state.books,
        ...payload,
        docs: payload?.page > 1 ? (state?.books?.docs?.filter((doc) => doc?._id === payload?.docs?.[0]?._id)?.length ? [...state?.books?.docs] : [...state?.books?.docs, ...payload?.docs]) : [...payload?.docs],
      },
    }),
    setPersonalBooks: (state, { payload }) => ({ ...state, personalBooks: { ...payload } }),
    setCurrent: (state, { payload }) => ({ ...state, current: { ...payload } }),
    setReviews: (state, { payload }) => ({ ...state, reviews: [...payload] }),
    setGenres: (state, { payload }) => ({ ...state, genres: [...payload] }),
  },
});
export const { setBooks, setPersonalBooks, setReviews, setGenres, setCurrent } = librarySlice.actions;

export const getBooks = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("/Book/list", { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data?.docs);
  dispatch(setBooks(data));
  dispatch(stopLoading());
};
export const getPersonalBooks = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/Book/personal-list/${payload?.id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setPersonalBooks({ docs: [...data] }));
  dispatch(stopLoading());
};
export const getBooksByQuery = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/Book/find/${payload?.query}`);
  console.log(data);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setBooks({ docs: [...data] }));
  dispatch(stopLoading());
};
export const getCurrentBook = (payload) => async (dispatch) => {
  dispatch(setCurrent({}));
  dispatch(startLoading());
  const { data } = await httpClient.get(`/Book/${payload._id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(setCurrent(data));
  dispatch(stopLoading());
};
export const getCurrentBookReviews = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get(`/Review/book/${payload._id}`);
  if (payload?.onSuccess) payload?.onSuccess(data?.payload);
  dispatch(setReviews([...Object.values(data)]));
  dispatch(stopLoading());
};
export const createReview = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post(`/Review/create`, { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const deleteReview = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.delete(`/Review/delete/${payload?._id}`);
  if (payload?.onSuccess) payload?.onSuccess(data);
  dispatch(stopLoading());
};
export const getGenres = () => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.get("/Genre/list");
  dispatch(setGenres(data));
  dispatch(stopLoading());
};
export const createBook = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.post("/Book/create", { ...payload });
  if (payload?.onSuccess) payload?.onSuccess(data?.payload);
  dispatch(stopLoading());
};
export const editBook = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.put(`/Book/update/${payload?._id}`, { ...payload?.payload });
  if (payload?.onSuccess) payload?.onSuccess(data?.payload);
  dispatch(stopLoading());
};
export const deleteBook = (payload) => async (dispatch) => {
  dispatch(startLoading());
  const { data } = await httpClient.delete(`/Book/delete/${payload?._id}`);
  if (payload?.onSuccess) payload?.onSuccess(data?.payload);
  dispatch(stopLoading());
};
export default librarySlice.reducer;
