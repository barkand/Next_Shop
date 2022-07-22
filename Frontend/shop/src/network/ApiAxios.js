import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import { defaultGlobal } from "/src/context/global";
import {
  GetValueLocalStorage,
  SetValueLocalStorage,
  RemoveLocalStorage,
} from "/src/localStorage";
import { queryString } from "/src/functions/queryString";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

let axiosInstance;

const api = () => {
  let token = GetValueLocalStorage("token");

  if (
    !axiosInstance ||
    axiosInstance.defaults.headers.common.Authorization !== token
  ) {
    axiosInstance = axios.create({
      baseURL: apiURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  axiosInstance.interceptors.request.use(async (request) => {
    request.headers["User-Lang"] =
      GetValueLocalStorage("lang") || defaultGlobal.culture.language;

    const user = jwt_decode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 5000;

    if (!isExpired) {
      request.headers["Authorization"] = `Bearer ${token}`;

      return request;
    }

    const response = await axios.post(`users/v1/login/refresh/`, {
      refresh: GetValueLocalStorage("refresh"),
    });

    token = response.data.access;
    SetValueLocalStorage("token", token);

    request.headers["Authorization"] = `Bearer ${token}`;

    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const GetRestApi = (path, query) => {
  return new Promise((resolve, reject) => {
    api()
      .get(`${path}/`, {
        params: query,
        paramsSerializer: (params) => queryString(params),
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (
          error.response.data.messages &&
          error.response.data.messages[0].token_class === "AccessToken"
        ) {
          axios()
            .post(`users/v1/login/refresh/`, {
              refresh: GetValueLocalStorage("refresh"),
            })
            .then((response) => {
              if (response.data.access) {
                SetValueLocalStorage("token", response.data.access);
                return GetRestApi(path, query);
              }
            })
            .catch((error) => {
              if (
                error.response.data.messages &&
                error.response.data.code === "token_not_valid"
              ) {
                RemoveLocalStorage("token");
                RemoveLocalStorage("refresh");
              } else {
                reject(error);
              }
            });
        } else {
          reject(error);
        }
      });
  });
};

export const PostRestApi = (path, params) => {
  return new Promise((resolve, reject) => {
    api()
      .post(`${path}/`, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (
          error.response.data.messages &&
          error.response.data.messages[0].token_class === "AccessToken"
        ) {
          api()
            .post(`users/v1/login/refresh/`, {
              refresh: GetValueLocalStorage("refresh"),
            })
            .then((response) => {
              if (response.data.access) {
                SetValueLocalStorage("token", response.data.access);
                return PostRestApi(path, params);
              }
            });
        } else {
          reject(error);
        }
      });
  });
};
