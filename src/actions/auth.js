import axios from 'axios';

import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT } from '../constants/auth';

export const login = data => ({
  type: AUTH_LOGIN,
  ...data
});

export const startLogin = data => dispatch =>
  axios({
    method: 'post',
    url: 'api/users/login',
    data
  })
    .then(res => {
      if (res.data.tokens.length) {
        return dispatch(
          login({
            token: res.data.tokens[0].token,
            user: {
              _id: res.data._id,
              username: res.data.username,
              email: res.data.email
            }
          })
        );
      }
      return null;
    })
    .catch(e => ({
      error: e
    }));

export const register = data => ({
  type: AUTH_REGISTER,
  ...data
});

export const startRegister = data => dispatch => {
  axios({
    method: 'post',
    url: 'api/users',
    data
  })
    .then(res => {
      if (res.data.tokens.length) {
        return dispatch(
          register({
            token: res.data.tokens[0].token,
            user: {
              _id: res.data._id,
              username: res.data.username,
              email: res.data.email
            }
          })
        );
      }
      return null;
    })
    .catch(e => ({
      error: e
    }));
};

export const logout = () => ({
  type: AUTH_LOGOUT
});

export const startLogout = () => (dispatch, getState) => {
  axios({
    method: 'delete',
    url: 'api/users/me/token',
    headers: {
      'x-auth': getState().token
    }
  })
    .then(() => {
      dispatch(logout());
    })
    .catch(e => ({
      error: e
    }));
};
