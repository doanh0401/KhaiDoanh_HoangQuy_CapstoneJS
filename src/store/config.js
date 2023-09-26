<<<<<<< HEAD
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
})
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
=======
import { combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./reducers/userReducer";

const  rootReducer = combineReducers({
    userReducer: userReducer,
});

export const store = legacy_createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
>>>>>>> bfcd9434559a7d0989e8483be9d8e5786d4dfe6f
