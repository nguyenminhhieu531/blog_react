import { mappingCategoryData, mappingPostData } from "../../helpers";
import categoryService from "../../services/categoryService";
import postService from "../../services/postService";
import { actPagingCommentAsync, actParentCommentAsync } from "../comment/action";

// ACTION TYPE
export const ACT_POSTS_LATEST = "ACT_POSTS_LATEST";
export const ACT_POSTS_POPULAR = "ACT_POSTS_POPULAR";
export const ACT_POSTS_GENERAL = "ACT_POSTS_GENERAL";
export const ACT_POSTS_SEARCH = "ACT_POSTS_SEARCH";
export const ACT_POSTS_PAGING = "ACT_POSTS_PAGING";
export const ACT_POSTS_CATEGORY = "ACT_POSTS_CATEGORY";
export const ACT_POSTS_DETAIL = "ACT_POSTS_DETAIL";
export const ACT_POSTS_TAG = "ACT_POSTS_TAG";
export const ACT_POSTS_ALL = "ACT_POSTS_ALL";

// ACTION CREATOR -> hàm tạo ra action
export function actPostsLatest(items) {
  return {
    type: ACT_POSTS_LATEST,
    payload: items,
  };
}

export function actPostsPopular(items) {
  return {
    type: ACT_POSTS_POPULAR,
    payload: items,
  };
}

export function actPostsGeneral(items) {
  return {
    type: ACT_POSTS_GENERAL,
    payload: items,
  };
}

export function actPostsSearch(items) {
  return {
    type: ACT_POSTS_SEARCH,
    payload: items,
  };
}

export function actPostsPaging(items) {
  return {
    type: ACT_POSTS_PAGING,
    payload: items,
  };
}

export function actPostsCategory(items) {
  return {
    type: ACT_POSTS_CATEGORY,
    payload: items,
  };
}

export function actPostsDetail(items) {
  return {
    type: ACT_POSTS_DETAIL,
    payload: items,
  };
}

export function actPostsTag(items) {
  return {
    type: ACT_POSTS_TAG,
    payload: items,
  };
}

export function actPostsAll(items) {
  return {
    type: ACT_POSTS_ALL,
    payload: items,
  };
}

// ACTION ASYNC
export function actPostsLatestAsync() {
  return async (dispatch) => {
    const res = await postService.getLatest();
    const data = res.data.map(mappingPostData);
    dispatch(actPostsLatest(data));
  };
}

export function actPostsPopularAsync() {
  return async (dispatch) => {
    const res = await postService.getPopular();
    const data = res.data.map(mappingPostData);
    dispatch(actPostsPopular(data));
  };
}

export function actPostsGeneralAsync(params = { page: 1 }) {
  return async (dispatch) => {
    const res = await postService.getGeneral(params);
    const totalPage = parseInt(res.headers["x-wp-totalpages"]);
    const list = res.data.map(mappingPostData);
    const data = { list, totalPage, currentPage: params.page };

    dispatch(actPostsGeneral(data));
  };
}

export function actPostsSearchAsync(params = { search, page: 1 }) {
  return async (dispatch) => {
    const res = await postService.getSearch(params);
    const totalPage = parseInt(res.headers["x-wp-totalpages"]);
    const total = parseInt(res.headers["x-wp-total"]);
    const list = res.data.map(mappingPostData);
    const data = { list, totalPage, currentPage: params.page, total };

    dispatch(actPostsSearch(data));
  };
}

export function actPostsPagingAsync(params = { page: 1 }) {
  return async (dispatch) => {
    const res = await postService.getPaging(params);
    const totalPage = parseInt(res.headers["x-wp-totalpages"]);
    const total = parseInt(res.headers["x-wp-total"]);
    const list = res.data.map(mappingPostData);
    const data = { list, totalPage, currentPage: params.page, total };

    dispatch(actPostsPaging(data));
  };
}

export function actPostsCategoryAsync(slug, page = 1) {
  return async (dispatch) => {
    const res = await categoryService.getDetail(slug);
    console.log(res.data[0].id);

    const resByCategory = await postService.getByCategory(res.data[0].id, page);
    const totalPage = parseInt(resByCategory.headers["x-wp-totalpages"]);
    const list = resByCategory.data.map(mappingPostData);

    const data = { list, totalPage, currentPage: page };
    dispatch(actPostsCategory(data));
  };
}

export function actPostsDetailAsync(slug) {
  return async (dispatch) => {
    const res = await postService.getDetail(slug);
    const data = res.data[0];

    dispatch(actPostsDetail(data));
    dispatch(actPagingCommentAsync({ post: data.id, page: 1 }));
  };
}

export function actPostsTagAsync(slug, page = 1) {
  return async (dispatch) => {
    const res = await postService.getDetail(slug);

    const resByTag = await postService.getTag(res.data[0].id, page);
    const totalPage = parseInt(resByTag.headers["x-wp-totalpages"]);
    const list = resByTag.data.map(mappingCategoryData);

    const data = { list, totalPage, currentPage: page };
    dispatch(actPostsTag(data));
  };
}

export function actPostsAllAsync() {
  return async (dispatch) => {
    const res = await postService.getAll();
    const data = res.data.map(mappingPostData);
    dispatch(actPostsAll(data));
  };
}
