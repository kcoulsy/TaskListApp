import axios from 'axios';

export const login = data => ({
  type: 'LOGIN',
  ...data,
});

export const startLogin = data => dispatch => axios({
  method: 'post',
  url: '/users/login',
  data,
}).then((res) => {
  if (res.data.tokens.length) {
    return dispatch(login({
      token: res.data.tokens[0].token,
      user: {
        _id: res.data._id,
        username: res.data.username,
        email: res.data.email,
      },
    }));
  }
  return null;
}).catch(e => ({
  error: e,
}));

export const register = data => ({
  type: 'REGISTER',
  ...data,
});

export const startRegister = data => (dispatch) => {
  axios({
    method: 'post',
    url: '/users',
    data,
  }).then((res) => {
    if (res.data.tokens.length) {
      return dispatch(register({
        token: res.data.tokens[0].token,
        user: {
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
        },
      }));
    }
    return null;
  }).catch(e => ({
    error: e,
  }));
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => (dispatch, getState) => {
  axios({
    method: 'delete',
    url: '/users/me/token',
    headers: {
      'x-auth': getState().token,
    },
  }).then(() => {
    dispatch(logout());
  }).catch(e => ({
    error: e,
  }));
};
