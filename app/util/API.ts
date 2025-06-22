import axios, { AxiosResponse, AxiosError } from "axios";
import { store } from "../store/stores";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use(
  (config: any): any => {
    const token = store.getState().auth.currentUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (reponse: AxiosResponse): AxiosResponse => {
    return reponse;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default API;
