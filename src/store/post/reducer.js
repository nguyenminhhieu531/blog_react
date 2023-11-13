import {
  ACT_POSTS_PAGING,
  ACT_POSTS_ALL,
  ACT_POSTS_CATEGORY,
  ACT_POSTS_DETAIL,
  ACT_POSTS_GENERAL,
  ACT_POSTS_LATEST,
  ACT_POSTS_POPULAR,
  ACT_POSTS_SEARCH,
  ACT_POSTS_TAG,
} from "./action";

const initialState = {
  postsLatest: [],
  postsPopular: [],
  postsGeneral: {
    list: [],
    totalPage: 0,
    currentPage: 1,
  },
  postsSearch: {
    list: [],
    currentPage: 1,
    totalPage: 0,
    total: 0,
  },
  postsPaging: {
    list: [],
    currentPage: 1,
    totalPage: 0,
    total: 0,
  },
  postsCategory: {
    list: [],
    totalPage: 0,
    currentPage: 1,
  },
  postsDetail: null,
  postsTag: {
    list: [],
    totalPage: 0,
    currentPage: 1,
  },
  postsAll: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACT_POSTS_LATEST: {
      return {
        ...state,
        postsLatest: action.payload,
      };
    }
    case ACT_POSTS_POPULAR: {
      return {
        ...state,
        postsPopular: action.payload,
      };
    }
    case ACT_POSTS_GENERAL: {
      let payload = action.payload;
      let newList =
        action.payload.currentPage === 1 ? payload.list : [...state.postsGeneral.list, ...action.payload.list];

      return {
        ...state,
        postsGeneral: {
          ...state.postsGeneral,
          ...payload,
          list: newList,
        },
      };
    }
    case ACT_POSTS_SEARCH: {
      let payload = action.payload;
      // let newList = [...state.postsSearch.list, ...action.payload.list];
      let newList =
        action.payload.currentPage === 1 ? payload.list : [...state.postsSearch.list, ...action.payload.list];

      return {
        ...state,
        postsSearch: {
          ...state.postsSearch,
          ...payload,
          list: newList,
        },
      };
    }
    case ACT_POSTS_PAGING: {
      let payload = action.payload;
      // let newList = [...state.postsPaging.list, ...action.payload.list];
      let newList =
        action.payload.currentPage === 1 ? payload.list : [...state.postsPaging.list, ...action.payload.list];

      return {
        ...state,
        postsPaging: {
          ...state.postsPaging,
          ...payload,
          list: newList,
        },
      };
    }
    case ACT_POSTS_CATEGORY: {
      let payload = action.payload;
      // let newList = [...state.postsSearch.list, ...action.payload.list];
      let newList =
        action.payload.currentPage === 1 ? payload.list : [...state.postsCategory.list, ...action.payload.list];

      return {
        ...state,
        postsCategory: {
          ...state.postsCategory,
          ...payload,
          list: newList,
        },
      };
    }
    case ACT_POSTS_DETAIL: {
      return {
        ...state,
        postsDetail: action.payload,
      };
    }
    case ACT_POSTS_TAG: {
      let payload = action.payload;
      // let newList = [...state.postsSearch.list, ...action.payload.list];
      let newList = action.payload.currentPage === 1 ? payload.list : [...state.postsTag.list, ...action.payload.list];

      return {
        ...state,
        postsTag: {
          ...state.postsTag,
          ...payload,
          list: newList,
        },
      };
    }
    case ACT_POSTS_ALL: {
      return {
        ...state,
        postsAll: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducer;
