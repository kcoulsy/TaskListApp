import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers import
import authReducer from '../reducers/auth';

// required for redux dev tools in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	return createStore(
		authReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
}