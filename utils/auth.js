import axios, { axiosWrapper } from "../vendor/axios";

export async function getToken(username, password) {
  const { data } = await axiosWrapper(axios.post, "/api-token-auth/", {
    username,
    password,
  });
  return data.token;
}

export async function getUser() {
  const { data } = await axiosWrapper(axios.get, "/me/privileged/");
  return data;
}
