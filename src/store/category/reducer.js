import { ACT_CATEGORIES_LIST } from "./action";

const initialState = {
  categories: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACT_CATEGORIES_LIST: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducer;
