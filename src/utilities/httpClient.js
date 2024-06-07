import axios from "axios";
import store, { stopLoading } from "../actions";
import { API_URL } from "../config/settings";
import { toast } from "react-toastify";

const httpClient = axios.create({ baseURL: API_URL });

httpClient.interceptors.request.use(
  async (config) => {
    const tokenStorage = localStorage.getItem("ibdb-token") ?? "";
    config.headers = {
      ...(tokenStorage && { Authorization: `Bearer ${tokenStorage}` }),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    store.dispatch(stopLoading());
    console.log(error);

    if ([401, 403]?.includes(error.response.status)) {
      if (window.location.pathname !== "/auth") {
        localStorage.clear();
        window.location.href = "/auth";
      } else toast.error("Invalid credentials");
    } else {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
