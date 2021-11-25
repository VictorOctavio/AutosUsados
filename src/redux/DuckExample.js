// Constant data Init
const dataInicial = {
    array: []
}

//Types
const TYPE_EXAMPLE = 'TYPE_EXAMPLE';

//Reducers
export default function DuckExampleReducer(state = dataInicial, action){
    
    switch(action.type){
        case TYPE_EXAMPLE: return {...state, array: ['example']}
        default: return state;
    }

}

//Actions
export const DuckExampleAction = () => (dispatch, getState) => {

}