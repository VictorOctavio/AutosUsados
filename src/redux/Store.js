import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Ducks
import UserReducer, { readSessionAction } from './UserDuck';
import AppReducer from './AppDuck';

// Combine reducers
const rootReducer = combineReducers({
    app: AppReducer,
    user: UserReducer
})

export default function generateStore() {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
    readSessionAction()(store.dispatch)
    return store
};
