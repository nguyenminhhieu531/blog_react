import API from "./api";

const categoryService = {
  getAll() {
    return API.get("/wp/v2/categories?per_page=100&page=1&lang=vi");
  },
  getDetail(slug) {
    return API.get("/wp/v2/categories", {
      params: {
        slug,
        lang: "vi",
      },
    });
  },
  // getAll() {
  //   return API.get("/wp/v2/categories?per_page=100&page=1&lang=vi");
  // },
  // getDetail(slug) {
  //   return API.get(`/wp/v2/categories?slug=${slug}&page=1&lang=vi`);
  // },
};

export default categoryService;
