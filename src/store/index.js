import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import categoryReducer from "./category/reducer";
import commentReducer from "./comment/reducer";
import menuReducer from "./menu/reducer";
import postReducer from "./post/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  POST: postReducer,
  CATEGORY: categoryReducer,
  MENU: menuReducer,
  USER: userReducer,
  COMMENT: commentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
