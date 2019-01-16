import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers import


// required for redux dev tools in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

export default () => {
	return createStore(composeEnhancers(applyMiddleware(thunk)));
}