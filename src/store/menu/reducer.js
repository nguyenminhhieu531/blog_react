import { ACT_MAIN_MENU } from "./action";

const initialState = {
  mainMenu: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACT_MAIN_MENU: {
      return {
        ...state,
        mainMenu: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducer;
