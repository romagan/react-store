import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const logEnhancer = (createStore) => (...args) => {
  const store = createStore(...args);
  const originalDispatch = store.dispatch;

  store.dispatch = (action) => {
    console.log(action.type);
    return originalDispatch(action);
  }

  return store;
}

const stringEnhancer = (createStore) => (...args) => {
  const store = createStore(...args)
  const originalDispatch = store.dispatch;

  store.dispatch = (action) => {
    if (typeof action === `string`) {
      return originalDispatch({type: action})
    }

    return originalDispatch(action)
  }
  return store;
}

const logMiddleware = (/*store:*/ { getState, dispatch }) => (next) => (action) => {
  console.log(action.type);
  return next(action);
}

const stringMiddleware = () => (dispatch) => (action) => {
  if (typeof action === `string`) return dispatch({ type: action })
  return dispatch(action);
}

const store = createStore(
                reducer,
                composeWithDevTools(
                  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)
                ));

// const store = createStore(
//                 reducer,
//                 applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));

// const store = createStore(
//                 reducer,
//                 compose(stringEnhancer, logEnhancer));


//THUNK
const customActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: `CUSTOM_ACTION`
  }), timeout)
}

store.dispatch(customActionCreator(1000));

export default store;
