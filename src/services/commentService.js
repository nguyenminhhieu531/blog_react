import API from "./api";

const commentService = {
  getPaging(params = {}) {
    return API.get("/wp/v2/comments", {
      params: {
        per_page: 5,
        parent: 0,
        order: "asc",
        ...params,
      },
    });
  },
  getParent(params = {}) {
    return API.get("/wp/v2/comments", {
      params: {
        per_page: 5,
        parent: 0,
        order: "asc",
        ...params,
      },
    });
  },
  getChild(params = {}) {
    return API.get("/wp/v2/comments", {
      params: {
        order: "asc",
        ...params,
      },
    });
  },
  postComment(data) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return API.post("/wp/v2/comments", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default commentService;
