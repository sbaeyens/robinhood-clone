import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import portfolioReducer from './portfolio';
import session from './session'
import transactionReducer from './transactions';
import watchlistReducer from './watchlists'
import investmentReducer from './investments'
import historyReducer from './portfolioHistory';

const rootReducer = combineReducers({
  session,
  watchlists: watchlistReducer,
  portfolio: portfolioReducer,
  transactions: transactionReducer,
  investments: investmentReducer,
  history: historyReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
