import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decoded from "jwt-decode";
import { start } from "../index.js";

const baseURL = "http://127.0.0.1:8000";
const homeURL = "http://127.0.0.1:3000";
const LOGGINGFAILED = "ERR_CANCELED";

axios.defaults.baseURL = baseURL + "/api/";

const axiosAuthenticated = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosAuthenticated.interceptors.request.use(async function (config) {
  const cookies = new Cookies();
  const acc = cookies.get("access");

  // if access token is in cookies and it is not expired put it in the header and return
  if (acc) {
    const dec = jwt_decoded(acc);
    if (dec.exp && dec.exp * 1000 > Date.now()) {
      config.headers.Authorization = "Bearer " + acc;
      return config;
    }
  }

  const ref = cookies.get("refresh");
  // if refresh token is in the cookies and it is not expired, request for an access wait
  // until it comes back, put it in the headers and return
  if (ref) {
    const dec = jwt_decoded(ref);
    if (dec.exp && dec.exp * 1000 > Date.now()) {
      const response = await axios.post("token/refresh/", { refresh: ref });
      cookies.set("access", response.data.access, {
        expires: new Date(jwt_decoded(response.data.access).exp * 1000),
      });
      config.headers.Authorization = response.data.access;
      return config;
    }
  }

  const controller = new AbortController();
  controller.abort();

  return {
    ...config,
    signal: controller.signal,
  };
});

export async function signIn(user) {
  const response = await axios.post("token/", user);
  const cookies = new Cookies();
  cookies.set("refresh", response.data.refresh, {
    expires: new Date(jwt_decoded(response.data.refresh).exp * 1000),
    path: "/",
  });
  cookies.set("access", response.data.access, {
    expires: new Date(jwt_decoded(response.data.access).exp * 1000),
    path: "/",
  });
  start();
}

export function signOut() {
  const cookies = new Cookies();
  cookies.remove("refresh");
  cookies.remove("access");
  start();
}

export async function getUserTasks() {
  const response = await axiosAuthenticated.get("task/all/").catch((error) => {
    if (error.code === LOGGINGFAILED) {
      window.location.href = homeURL + "/signin/";
    }
  });
  return response.data;
}

export async function getUserData() {
  const response = await axiosAuthenticated
    .get("user/detail/")
    .catch((error) => {});

  return response?.data;
}

export async function fetchUserGroups() {
  const response = await axiosAuthenticated.get("group/list/");
  return response?.data;
}

export async function finishUserTask() { 
  
}
