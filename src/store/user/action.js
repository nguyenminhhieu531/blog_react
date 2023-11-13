import userService from "../../services/userService";

// ACTION TYPE
// export const ACT_USER_LOGIN = "ACT_USER_LOGIN";
export const ACT_USER_FETCH_ME = "ACT_USER_FETCH_ME";
export const ACT_USER_LOGOUT = "ACT_USER_LOGOUT";
// export const ACT_USER_REGISTER = "ACT_USER_REGISTER";

// ACTION CREATOR -> hàm tạo ra action
// export function actUserLogin(data) {
//   return {
//     type: ACT_USER_LOGIN,
//     payload: data,
//   };
// }

export function actUserFetchMe(data) {
  return {
    type: ACT_USER_FETCH_ME,
    payload: data,
  };
}

// export function actUserRegister(data) {
//   return {
//     type: ACT_USER_REGISTER,
//     payload: data,
//   };
// }

export function actUserLogout() {
  return {
    type: ACT_USER_LOGOUT,
  };
}

// ACTION ASYNC
export function actUserLoginAsync(data) {
  return async (dispatch) => {
    try {
      const res = await userService.login(data);
      console.log(res);

      const token = res.data.token;

      localStorage.setItem("ACCESS_TOKEN", token);

      // const resFetchMe = await userService.fetchMe(token);
      // const currenUser = resFetchMe.data;
      // dispatch(actUserLogin({ currenUser, token }));

      dispatch(actUserFetchMeAsync(token));

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
      };
    }
  };
}

export function actUserRegisterAsync(data) {
  return async (dispatch) => {
    try {
      const res = await userService.register(data);
      console.log(res);
      dispatch(actUserLoginAsync({ username: data.username, password: data.password }));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.response.data.message,
      };
    }
  };
}

export function actUserChangePasswordAsync(data) {
  return async (dispatch) => {
    try {
      const res = await userService.changePassword(data);
      console.log(res);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
      };
    }
  };
}

export function actUserFetchMeAsync(token) {
  return async (dispatch) => {
    try {
      if (!token) {
        token = localStorage.getItem("ACCESS_TOKEN");
      }
      // console.log(token);

      const resFetchMe = await userService.fetchMe(token);
      // console.log(resFetchMe);
      const currenUser = resFetchMe.data;
      dispatch(actUserFetchMe({ currenUser, token }));
    } catch (error) {
      dispatch(actUserLogout());
    }
  };
}
