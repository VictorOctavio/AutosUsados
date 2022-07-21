import { URI } from '../Config';

//Data Inicial
const user = {
    loading: false,
    session: false,
    informacion: null,
    token: null,
    message_user: { active: false, err: false, message: '' }
}

//Types
const LOADING = 'LOADING';
const LOGIN_USER = 'LOGIN_USER';
const REGISTER = 'REGISTER';
const MESSAGE_USER = 'MESSAGE_USER'

//Reducer
export default function userDuckReducer(state = user, action) {

    switch (action.type) {
        case LOGIN_USER: return { ...state, loading: false, session: true, informacion: action.payload.data, token: action.payload.token }
        case LOADING: return { ...state, loading: true }
        case REGISTER: return { ...state, loading: false, token: action.payload.token, informacion: action.payload.data }
        case MESSAGE_USER: return { ...state, loading: false, message_user: { active: true, message: action.payload.message, err: action.payload.err } }
        default: return { ...state };
    }

}

//Acciones
export const registerUserAccion = (userData, setResMessage) => async (dispatch) => {
    try {

        const sendData = { email: userData.email, password: userData.contraseña, nombre: userData.nombre }
        dispatch({ type: LOADING })

        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendData)
        }

        const res = await fetch(`${URI}/register`, config);
        const data = await res.json();

        if (data.err) setResMessage({ message: data.message, color: 'red', err: true });
        else setResMessage({ message: data.message, color: 'yellow', err: false });

        dispatch({ type: REGISTER, payload: data })

    } catch (err) { console.log(err.message) }
}


export const loginUserAccion = (userData, setResMessage) => async (dispatch) => {
    try {
        const sendData = { email: userData.email, password: userData.contraseña }

        dispatch({ type: LOADING })

        //Petición y capturacion de respuesta
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendData)
        }
        const res = await fetch(`${URI}/login`, config);
        const data = await res.json();

        //Controlar respuestas
        if (data.err) return setResMessage({ message: data.message, color: 'red', err: true });
        else setResMessage({ message: data.message, color: 'green', err: false });

        //Guardar token en localstorage    
        localStorage.setItem('token', data.token);

        setTimeout(() => {
            dispatch({ type: LOGIN_USER, payload: data })
        }, 1500)

    } catch (err) { console.log(err.message) }
}


export const readSessionAction = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        try {
            const config = { method: 'GET', headers: { 'auth-token': localStorage.getItem('token') } }
            const res = await fetch(`${URI}/verify-token`, config);
            const data = await res.json();

            console.log(data)

            if (data.err) return localStorage.removeItem('token');
            else {
                let dataPayload = { data: data.data, token: localStorage.getItem('token') }
                dispatch({ type: LOGIN_USER, payload: dataPayload })
            }

        } catch (err) { console.log(err) }
    }
}


export const recuperarClaveAction = (user, setResMessage) => async (dispatch) => {
    try {

        const config = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) }
        const res = await fetch(`${URI}/recuperar-clave`, config);
        const data = await res.json();

        if (data.err) setResMessage({ message: data.message, color: 'red', err: true })
        else setResMessage({ message: data.message, color: 'tomato', err: false })

    } catch (err) { console.log(err.message) }
}


export const updateDataUserAction = (informacion) => async (dispatch, GetState) => {
    try {

        dispatch({ type: LOADING })

        
        const { token } = GetState().user;
        
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(informacion)
        }

        const res = await fetch(`${URI}/user`, config);
        const data = await res.json();
        
        dispatch({ type: MESSAGE_USER, payload: data });

    } catch (err) { console.log(err) }
}

export const UPDATE_AVATAR_USER = (image, setImageActive) => async (dispatch, GetState) => {
    try {

        const { token } = GetState().user;
        const formData = new FormData();
        formData.append('image', image[0]);

        const config = {
            method: 'PUT',
            headers: { 'auth-token': token },
            body: formData
        }

        const res = await fetch(`${URI}/user/avatar`, config);
        const data = await res.json();

        if (data.err) return dispatch({ type: MESSAGE_USER, payload: data })

        dispatch({ type: MESSAGE_USER, payload: data });
        setImageActive(data.image);

    } catch (err) { console.log(err.message) }
}