import { throttle } from 'lodash'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { loadState, saveState } from './local-storage'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from '../reducers/index'

export const history = createBrowserHistory()

const enhancers = []
const middleware = [
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composedEnhancers
)

if(localStorage.getItem('state') === null){
  saveState({
    app: store.getState().app
  });
}

store.subscribe(throttle(() => {
  saveState({
    app: store.getState().app
  });
}));

export default store