import axios from "axios";

const API = "http://localhost:3000";

export const fetchAppData = () => {
  return Promise.all([
    axios.get(`${API}/menu`),
    axios.get(`${API}/student`),
    axios.get(`${API}/parent`)
  ]);
};

export const createOrder = (payload) => {
  return axios.post(`${API}/orders`, payload);
};