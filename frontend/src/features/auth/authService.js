import axios from "axios";

const API_REG = "http://localhost:8080/api/v1/auth/sign-up";
const API_LOG = "http://localhost:8080/api/v1/auth/sign-in";

const register = async (userData) => {
  const response = await axios.post(API_REG, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_LOG, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
