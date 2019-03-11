import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { routerMiddleware } from 'react-router-redux'

let logger = createLogger();
let middleware = [thunk];


  middleware.push(logger)

const getMiddleware = () => {
  return applyMiddleware(...middleware);
};

const store = createStore(reducer, composeWithDevTools(getMiddleware()));

export default store;
