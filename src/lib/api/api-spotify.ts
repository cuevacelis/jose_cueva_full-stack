import axios from "axios";

export const axiosSpotifyApi = axios.create();

axiosSpotifyApi.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.baseURL = "/api/spotify";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosSpotifyApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
