import { createStore, combineReducers, applyMiddleware } from "redux";
import { shopsReducer } from "./reducers/shops";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	shops: shopsReducer,
});
export default createStore(rootReducer, applyMiddleware(thunk));
