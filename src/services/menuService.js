import API from "./api";

const menuService = {
  getAll() {
    return API.get("/menus/v1/menus/main-menu-vi");
  },
};

export default menuService;
