import API from "./api";

const postService = {
  getAll(inputParams = {}) {
    return API.get("/wp/v2/posts", {
      params: {
        page: 1,
        per_page: 10,
        ...inputParams,
        lang: "vi",
      },
    });
  },
  getLatest() {
    return this.getAll({ per_page: 3 });
  },
  getPopular() {
    return this.getAll({ orderby: "post_views" });
  },
  getGeneral(params = { page: 1 }) {
    return this.getAll({ per_page: 2, ...params });
  },
  getSearch(params = { search, page: 1 }) {
    return this.getAll({ per_page: 1, ...params });
  },
  getPaging(params = { page: 1 }) {
    return this.getAll({ per_page: 2, ...params });
  },
  // getAll() {
  //   return API.get("/wp/v2/posts?lang=vi&orderby=post_views&per_page=10&page=1");
  // },
  // getLatest() {
  //   return API.get("/wp/v2/posts?lang=vi&per_page=3&page=1");
  // },
  // getPopular() {
  //   return API.get("/wp/v2/posts?lang=vi&orderby=post_views&per_page=3&page=1");
  // },
  // getGeneral(page = 1) {
  //   return API.get(`/wp/v2/posts?lang=vi&per_page=2&page=${page}`);
  // },
  // getSearch(search, page = 1) {
  //   return API.get(`/wp/v2/posts?page=${page}&search=${search}&per_page=1&lang=vi`);
  // },
  getByCategory(id, page = 1) {
    return API.get(`/wp/v2/posts?per_page=1&page=${page}&categories=${id}&lang=vi`);
  },
  getDetail(slug) {
    return API.get(`/wp/v2/posts?slug=${slug}`);
  },
  getTag(post, page = 1) {
    return API.get(`/wp/v2/tags?per_page=10&page=${page}&lang=vi&post=${post}`);
  },
};

export default postService;
