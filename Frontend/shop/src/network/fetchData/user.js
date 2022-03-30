import { GetRestApi, PostRestApi } from "/src/network/apiAxios";
import fixImagePath from "/src/network/fetchData/image";

const name = "users";
const ver = "v1";

const getApi = (path, params) => GetRestApi(`${name}/${ver}/${path}`, params);
const postApi = (path, params) => PostRestApi(`${name}/${ver}/${path}`, params);

// Notification
export async function getNotifications() {
  const { data } = await getApi(`notifications`, {});
  return data;
}

// User
export async function registerUser(email, password) {
  return await postApi(`register`, { email, password });
}

export async function getProfile() {
  const { data } = await getApi(`profile`, {});
  if (data.image !== "" && data.image !== null) {
    fixImagePath("users", data);
  }
  return data;
}
