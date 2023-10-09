import { combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import { adminReducer } from "./reducers/adminReducer";

const  rootReducer = combineReducers({
    userReducer: userReducer,
    adminReducer: adminReducer,
});

export const store = legacy_createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
