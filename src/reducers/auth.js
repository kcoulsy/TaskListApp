const defaultAuthState = {
  token: null,
  user: {},
};

export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.token,
        user: action.user,
      };
    case 'REGISTER':
      return {
        token: action.token,
        user: action.user,
      };
    case 'LOGOUT':
      return defaultAuthState;
    default:
      return state;
  }
};
