import API from "./api";

const userService = {
  login(data) {
    return API.post("/jwt-auth/v1/token", data);
  },
  register(data) {
    return API.post("/wp/v2/users/register", data);
  },
  fetchMe(token) {
    return API.get("/wp/v2/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  changePassword(data) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return API.put("/wp/v2/users/password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userService;
