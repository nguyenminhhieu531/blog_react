import commentService from "../../services/commentService";

// ACTION TYPE
export const ACT_PARENT_COMMENT = "ACT_PARENT_COMMENT";
export const ACT_CHILD_COMMENT = "ACT_CHILD_COMMENT";
export const ACT_ADD_NEWS_COMMENT = "ACT_ADD_NEWS_COMMENT";
export const ACT_ADD_CHILD_NEWS_COMMENT = "ACT_ADD_CHILD_NEWS_COMMENT";

// ACTION CREATOR -> hàm tạo ra action
export function actParentComment(data) {
  return {
    type: ACT_PARENT_COMMENT,
    payload: data,
  };
}

export function actChildComment(data) {
  return {
    type: ACT_CHILD_COMMENT,
    payload: data,
  };
}

export function actAddNewsComment(data) {
  return {
    type: ACT_ADD_NEWS_COMMENT,
    payload: data,
  };
}

export function actAddChildNewsComment(data) {
  return {
    type: ACT_ADD_CHILD_NEWS_COMMENT,
    payload: data,
  };
}

// ACTION ASYNC
export function actPagingCommentAsync(params = { page: 1 }) {
  return async (dispatch) => {
    const res = await commentService.getPaging(params);

    const totalPage = parseInt(res.headers["x-wp-totalpages"]);
    const total = parseInt(res.headers["x-wp-total"]);
    const list = res.data;
    const data = { list, totalPage, currentPage: params.page, total };
    console.log(data);

    if (params.parent) {
      dispatch(actChildComment(data));
    } else {
      dispatch(actParentComment(data));
    }
  };
}

export function actParentCommentAsync(params = { page: 1 }) {
  return async (dispatch) => {
    const res = await commentService.getPaging(params);

    const totalPage = parseInt(res.headers["x-wp-totalpages"]);
    const total = parseInt(res.headers["x-wp-total"]);
    const list = res.data;
    const data = { list, totalPage, currentPage: params.page, total };

    dispatch(actParentComment(data));
  };
}

export function actChildCommentAsync(params = { page: 1 }) {
  return async (dispatch) => {
    const res = await commentService.getPaging(params);

    const totalPage = parseInt(res.headers["x-wp-totalpages"]);
    const total = parseInt(res.headers["x-wp-total"]);
    const list = res.data;
    const data = { list, totalPage, currentPage: params.page, total };

    dispatch(actChildComment(data));
  };
}

export function actNewsCommentAsync(data) {
  return async (dispatch) => {
    const res = await commentService.postComment(data);

    dispatch(actAddNewsComment(res.data));
  };
}

export function actAddChildNewsCommentAsync(data) {
  return async (dispatch) => {
    const res = await commentService.postComment(data);

    dispatch(actAddChildNewsComment(res.data));
  };
}
