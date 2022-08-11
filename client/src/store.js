import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllUsersReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  getAllUsersReducer: getAllUsersReducer,
});

const initialState = {

};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;