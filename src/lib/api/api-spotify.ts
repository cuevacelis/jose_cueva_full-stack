import axios from "axios";
import { getAuthToken } from "./utils";

export const axiosSpotifyApi = axios.create();

axiosSpotifyApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    config.headers.Authorization = token;
    config.headers["Content-Type"] = "application/json";
    config.baseURL = "https://api.spotify.com/v1";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosSpotifyApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
