export const login = (data) => {
	return {
		type: 'LOGIN',
		...data
	}
};

export const startLogin = (data) => {
	return (dispatch) => {
		// do api call then dispatch
		return dispatch(login(data));
	}
}
