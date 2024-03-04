import API from "./api";

const token = localStorage.getItem("ACCESS_TOKEN");

const mediaService = {
  upload(formData) {
    return API.post("/wp/v2/media", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default mediaService;
