import { ACT_USER_FETCH_ME, ACT_USER_LOGOUT } from "./action";

const initialState = {
  token: localStorage.getItem("ACCESS_TOKEN"),
  currenUser: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // case ACT_USER_LOGIN: {
    //   return {
    //     ...state,
    //     // token: action.payload,
    //     token: action.payload.token,
    //     currenUser: action.payload.currenUser,
    //     // ...action.payload,
    //   };
    // }
    case ACT_USER_FETCH_ME: {
      return {
        ...state,
        // token: action.payload,
        token: action.payload.token,
        currenUser: action.payload.currenUser,
        // ...action.payload,
      };
    }
    case ACT_USER_LOGOUT:
      localStorage.removeItem("ACCESS_TOKEN");
      return {
        ...state,
        token: null,
        currenUser: null,
      };
    default:
      return state;
  }
}

export default reducer;
