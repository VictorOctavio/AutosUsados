import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

//Ducks
import DuckExampleReducer from './DuckExample';

// Combine reducers
const rootReducer = combineReducers({
    exampleReducer: DuckExampleReducer

})

//compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    //Add functions Action middleware
    //Example readUserAction()(store.despatch)
    return store;
};