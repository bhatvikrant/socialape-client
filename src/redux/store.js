import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

// const middleware = [thunk];

const reducers = combineReducers({
	user: userReducer,
	data: dataReducer,
	UI: uiReducer,
});

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
