import { mappingMenuData } from "../../helpers";
import menuService from "../../services/menuService";

// ACTION TYPE
export const ACT_MAIN_MENU = "ACT_MAIN_MENU";

// ACTION CREATOR -> hàm tạo ra action
export function actMainMenu(items) {
  return {
    type: ACT_MAIN_MENU,
    payload: items,
  };
}

// ACTION ASYNC
export function actMainMenuAsync() {
  return async (dispatch) => {
    const res = await menuService.getAll();
    const data = res.data.items.map(mappingMenuData);
    dispatch(actMainMenu(data));
  };
}
