import axios from "axios";

const BASE_URL = "http://localhost:2000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const userLocalStorage = localStorage.getItem("persist:root");
  const userPersistData = JSON.parse(userLocalStorage);
  const currentUserData = userPersistData?.currentUser ? JSON.parse(userPersistData.currentUser) : null;
  
  const TOKEN= currentUserData?.accessToken
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = user?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});