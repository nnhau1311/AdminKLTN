import axios from "axios";

const URL = "http://localhost:9090";
export const login = async (params) =>
  await axios.post(`${URL}/auth/login`, params);
export const allHabit = async (num, size) =>
  await axios.post(`${URL}/habits/get-all`, {
    pageNumber: num,
    pageSize: size,
  });
export const createHabit = (params) =>
  axios.post(`${URL}/habits/create-a-new`, params);
export const editHabit = (params, id) =>
  axios.post(`${URL}/habits/update/${id}`, params);
export const deleteHabit = (id) => axios.post(`${URL}/habits/update/${id}`);
export const allUser = (num, size) =>
  axios.post(`${URL}/user/get-all`, {
    pageNumber: num,
    pageSize: size,
  });
export const createUser = (params) => axios.post(`${URL}/user/create`, params);
export const activeUser = (id) => axios.post(`${URL}/user/active/${id}`);
export const disableUser = (id) => axios.post(`${URL}/user/disable/${id}`);
