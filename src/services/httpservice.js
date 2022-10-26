import axios from "axios";
import config from "../config.json";

const { Api } = config;

const axiosInstance = axios.create({
    baseURL: Api.baseUrl,
    timeout: 100000,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

axiosInstance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("An exception occured", error);
  }
  return Promise.reject(error);
});

const http = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};

export default http;
