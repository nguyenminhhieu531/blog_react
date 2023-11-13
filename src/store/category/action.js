import { mappingCategoryData } from "../../helpers";
import categoryService from "../../services/categoryService";

// ACTION TYPE
export const ACT_CATEGORIES_LIST = "ACT_CATEGORIES_LIST";

// ACTION CREATOR -> hàm tạo ra action
export function actCategoriesList(items) {
  return {
    type: ACT_CATEGORIES_LIST,
    payload: items,
  };
}

// ACTION ASYNC
export function actCategoriesListAsync() {
  return async (dispatch) => {
    const res = await categoryService.getAll();
    const data = res.data.map(mappingCategoryData);
    dispatch(actCategoriesList(data));
  };
}
