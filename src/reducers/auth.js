import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT } from '../constants/auth';

const defaultAuthState = {
  token: null,
  user: {}
};

export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        token: action.token,
        user: action.user
      };
    case AUTH_REGISTER:
      return {
        token: action.token,
        user: action.user
      };
    case AUTH_LOGOUT:
      return defaultAuthState;
    default:
      return state;
  }
};
