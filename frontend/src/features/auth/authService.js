import axios from "axios";

const API_REG = "/api/v1/auth/sign-up";
const API_LOG = "/api/v1/auth/sign-in";
const API_GOG = "/api/v1/auth/google";
const API_UPD = "/api/v1/auth/update";
const API_DELU = "/api/v1/auth/delete";

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

const google = async (userData) => {
  const response = await axios.post(API_GOG, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const update = async (userData, token, userId) => {
  const response = await axios.post(`${API_UPD}/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const deleteUser = async (token, userId) => {
  const response = await axios.delete(`${API_DELU}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.removeItem("user");
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  google,
  login,
  update,
  deleteUser,
};
export default authService;
