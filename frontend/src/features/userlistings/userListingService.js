import axios from "axios";

const API_ULIS = "/api/v1/auth/listings";

const userListing = async (token, userId) => {
    const response = await axios.get(`${API_ULIS}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.data){
      localStorage.setItem("userlistings",JSON.stringify(response.data))
    }
    return response.data;
  };
  

const userListingsService = {
  userListing,
};

export default userListingsService;
