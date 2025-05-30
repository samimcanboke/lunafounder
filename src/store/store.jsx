import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer.jsx";
import todoReducers from "./reducers/Reducers.jsx";
import PostsReducer from "./reducers/PostsReducer.jsx";

const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  todoReducers,
});

export const store = createStore(reducers, composeEnhancers(middleware));
