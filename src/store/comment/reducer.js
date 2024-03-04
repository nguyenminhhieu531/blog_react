import { ACT_ADD_CHILD_NEWS_COMMENT, ACT_ADD_NEWS_COMMENT, ACT_CHILD_COMMENT, ACT_PARENT_COMMENT } from "./action";

const initialState = {
  parentComment: {
    list: [],
    totalPage: 0,
    total: 0,
    currentPage: 1,
  },
  childComment: {
    // 123: {
    //   list: [],
    //   totalPage: 0,
    //   total: 0,
    //   currentPage: 1,
    // },
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACT_PARENT_COMMENT: {
      let payload = action.payload;
      let newList = action.payload.currentPage === 1 ? payload.list : [...state.parentComment.list, ...payload.list];

      return {
        ...state,
        parentComment: {
          ...state.parentComment,
          ...payload,
          list: newList,
        },
      };
    }
    case ACT_ADD_NEWS_COMMENT: {
      return {
        ...state,
        parentComment: {
          ...state.parentComment,
          list: [action.payload, ...state.parentComment.list],
        },
      };
    }
    case ACT_ADD_CHILD_NEWS_COMMENT: {
      const payload = action.payload;
      const parentId = payload.parent;
      const childCommentOld = state.childComment;
      console.log(parentId);
      return {
        ...state,
        childComment: {
          ...childCommentOld,
          [parentId]: [payload, ...(childCommentOld[parentId] || [])],
        },
      };
    }
    case ACT_CHILD_COMMENT: {
      const parentId = action.payload.list[0].parent;
      console.log(parentId);

      return {
        ...state,
        childComment: {
          ...state.childComment,
          [parentId]: {
            ...(state.childComment[parentId] || {}),
            ...action.payload,
            list:
              action.payload.currentPage === 1
                ? action.payload.list
                : [...state.childComment[parentId].list, ...action.payload.list],
          },
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;
