import axios from "axios";
import apiUrl from "./apiUrl";

const createPinApi = async (pinData, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.post(`${apiUrl}api/pin`, pinData, config);
  localStorage.setItem("status", result.status);
  return result.data;
};

const pinterestApi = async () => {
  const result = await axios.get(`${apiUrl}api/pin`);
  return result.data;
};

const singlePin = async (id) => {
  const result = await axios.get(`${apiUrl}api/pin/${id}`);
  return result.data;
};

const userPin = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(`${apiUrl}api/pin/user`, config);
  return result.data;
};

const profilePins = async (id) => {
  const result = await axios.get(`${apiUrl}api/pin/user/${id}`);
  return result.data;
};
export { pinterestApi, singlePin, createPinApi, userPin, profilePins };
