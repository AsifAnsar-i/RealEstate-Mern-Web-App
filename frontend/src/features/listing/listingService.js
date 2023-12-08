import axios from "axios";

const API_LIS = "/api/v1/listing/create";

const create = async (userData, token) => {
  const response = await axios.post(API_LIS, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (response.data) {
    localStorage.setItem("listing", JSON.stringify(response.data));
  }

  return response.data;
};

const listingService = {
  create,
};

export default listingService;
