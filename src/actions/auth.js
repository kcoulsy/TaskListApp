import axios from 'axios';

export const login = (data) => {
	return {
		type: 'LOGIN',
		...data
	}
};

export const startLogin = (data) => {
	return (dispatch) => {
		// do api call then dispatch
		axios({
			method: 'post',
			url: '/users/login',
			data
		}).then((res) => {
			if (res.data.tokens.length) {
				return dispatch(login({
					token: res.data.tokens[0].token,
					user: {
						_id: res.data._id,
						username: res.data.username,
						email: res.data.email
					}
				}));
			}
		}).catch((e) => console.log(e));
	}
}

export const register = (data) => {
	return {
		type: 'REGISTER',
		...data
	}
};

export const startRegister = (data) => {
	return (dispatch) => {
		// do api call then dispatch
		axios({
			method: 'post',
			url: '/users',
			data
		}).then((res) => {
			if (res.data.tokens.length) {
				return dispatch(register({
					token: res.data.tokens[0].token,
					user: {
						_id: res.data._id,
						username: res.data.username,
						email: res.data.email
					}
				}));
			}
		}).catch((e) => console.log(e));
	}
}