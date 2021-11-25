import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

//Ducks
import DuckExampleReducer from './DuckExample';

// Combine reducers
const rootReducer = combineReducers({
    exampleReducer: DuckExampleReducer
})

export default function generateStore(){
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
    //Add functions Action middleware
    //Example readUserAction()(store.despatch)
    return store;
};