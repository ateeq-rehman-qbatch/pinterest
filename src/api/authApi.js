import axios from "axios";
import apiUrl from "./apiUrl";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${apiUrl}api/users`, userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${apiUrl}api/users/login`, userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${apiUrl}api/users/me`, config);
  return response.data;
};
const getUser = async (id) => {
  const response = await axios.get(`${apiUrl}api/users/${id}`);
  return response.data;
};
// update profile
const updateProfile = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${apiUrl}api/users/update/${id}`,
    userData,
    config
  );
  console.log(response,"update");
  return response.data;
};
// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authApi = {
  register,
  logout,
  login,
  getMe,
  updateProfile,
  getUser
};

export default authApi;
