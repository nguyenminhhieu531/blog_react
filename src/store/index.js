import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import postReducer from "./post/reducer";
import categoryReducer from "./category/reducer";
import menuReducer from "./menu/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  POST: postReducer,
  CATEGORY: categoryReducer,
  MENU: menuReducer,
  USER: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
