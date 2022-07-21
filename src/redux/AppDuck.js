import { URI } from '../Config';

// Satate Default
const dataInitial = {
    loading: false,
    products: null,
    publicationsUser: null,
    product: null,
    message: { active: false, err: false, message: '' }
}

// TYPES
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_USER = 'GET_PRODUCTS_USER'
const LOADING_PRODUCTS = 'LOADING_PRODUCTS'
const MESSAGE = 'MESSAGE'

// REDUCER
export default function AppDuckReducer(state = dataInitial, action) {
    switch (action.type) {
        case LOADING_PRODUCTS: return { ...state, loading: true }
        case MESSAGE: return { ...state, loading: false, message: { active: true, err: action.payload.err, message: action.payload.message } }
        case GET_PRODUCT: return { ...state, loading: false, product: action.payload }
        case GET_PRODUCTS: return { ...state, loading: false, products: action.payload }
        case GET_PRODUCTS_USER: return { ...state, loading: false, publicationsUser: action.payload }
        default: return { ...state };
    }
}


//Actions
export const GET_PUBLICATION_ACTION = (id) => async (dispatch) => {
    try {

        dispatch({ type: LOADING_PRODUCTS })
        const config = { headers: { 'auth-token': localStorage.getItem('token') } }

        let res;
        if (localStorage.getItem('token')) res = await fetch(`${URI}/publication/${id}`, config);
        else res = await fetch(`${URI}/publication/${id}`);
        const data = await res.json();

        if (data.err) return dispatch({ type: MESSAGE, payload: data })
        dispatch({ type: GET_PRODUCT, payload: data.data })

    } catch (err) { console.error(err.message) }
}


export const GET_PUBLICATIONS_ACTION = (categoria, search, moreDataScroll = false) => async (dispatch, GetState) => {
    try {

        if(!moreDataScroll) dispatch({ type: LOADING_PRODUCTS });

        const { products } = GetState().app;
        const config = { headers: { 'auth-token': localStorage.getItem('token') } }

        let res;
        if (localStorage.getItem('token')) res = await fetch(`${URI}/publications/${categoria}${search}`, config);
        else res = await fetch(`${URI}/publications/${categoria}${search}`);
        const data = await res.json();

        if (data.err) return dispatch({ type: MESSAGE, payload: data })

        // En caso de que se pida mas data en scroll agregamos a los que tenemos, SINO, se limpia al buscar nuevamente
        let moreProducts = [];
        if (moreDataScroll) {
            if (products) moreProducts = products.docs;
            data.data.docs.map(item => moreProducts.push(item))
            data.data.docs = moreProducts;
        }

        setTimeout(() => { dispatch({ type: GET_PRODUCTS, payload: data.data }) }, 1000)

    } catch (err) { console.error(err.message) }
}


export const GET_PUBLICATIONS_USER = () => async (dispatch) => {
    try {

        dispatch({ type: LOADING_PRODUCTS })

        const config = {
            method: 'GET',
            headers: { 'auth-token': localStorage.getItem('token') }
        }
        const res = await fetch(`${URI}/publicaciones/user`, config);
        const data = await res.json();

        if (data.err) return dispatch({ type: MESSAGE, payload: data })

        else dispatch({ type: GET_PRODUCTS_USER, payload: data.data })

    } catch (err) { return console.log(err.message) }
}


export const UPDATE_PUBLICATION_USER = (update) => async (dispatch) => {
    try {

        dispatch({ type: LOADING_PRODUCTS })

        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(update)
        }

        const res = await fetch(`${URI}/publicacion/user/edit/${update._id}`, config);
        const data = await res.json();

        if (data.err) return dispatch({ type: MESSAGE, payload: data })
        else dispatch({ type: MESSAGE, payload: data });

        dispatch({ type: GET_PRODUCTS_USER, payload: data.data })

    } catch (err) { return console.log(err.message) }
}


export const DELETE_PUBLICATION_USER = (id) => async (dispatch) => {
    try {

        dispatch({ type: LOADING_PRODUCTS })

        const config = {
            method: 'DELETE',
            headers: { 'auth-token': localStorage.getItem('token') }
        }
        const res = await fetch(`${URI}/publicacion/user/delete/${id}`, config);
        const data = await res.json();

        if (data.err) return dispatch({ type: MESSAGE, payload: data })

        dispatch({ type: MESSAGE, payload: data });
        dispatch({ type: GET_PRODUCTS_USER, payload: data.data })

    } catch (err) { return console.log(err.message) }
}



export const NEW_PUBLICACION_ACTION = (publication, images, descripcion) => async (dispatch, GetState) => {
    try {

        dispatch({ type: LOADING_PRODUCTS })

        const { token } = GetState().user;
        const formdata = new FormData();

        //Add campos publicacion
        publication.descripcion = descripcion.text;
    
        //Validación
        if (images.length < 1 || images.length > 10) return dispatch({ type: MESSAGE, payload: { err: true, message: 'imagenes requeridas (1 a 10 imagenes)' } });
        for (let item in publication) {
            if(typeof publication[item] === 'string') if (!publication[item].trim()) return dispatch({ type: MESSAGE, payload: { err: true, message: `campo ${item} requerido` } });
            formdata.append(item, (typeof publication[item] === 'string') ? publication[item].toLowerCase(): publication[item])
        };

        for (let i = 0; i < images.length; i++) { formdata.append("images", images[i]) }

        const config = {
            method: 'POST',
            headers: { 'auth-token': token },
            body: formdata
        }

        const res = await fetch(`${URI}/publication`, config);
        const data = await res.json();

        if (data.err) return dispatch({ type: MESSAGE, payload: data })
        else return dispatch({ type: MESSAGE, payload: data })

    } catch (err) { console.log(err.message) }
}

// UPDATE PUBLICACIONES GUARDADAS USUARIO
export const UPDATE_GUARDADOS_USER = (guardadoId, setMessageState) => async (dispatch, GetState) => {
    try {

        if (!localStorage.getItem('token')) return dispatch({ type: MESSAGE, payload: { err: true, message: 'Necesitas Iniciar Sesión' } });
        const publicUsers = GetState().app.publicationsUser;
        let publicacion = GetState().app.product;

        const config = {
            method: 'PUT',
            headers: { 'auth-token': localStorage.getItem('token') }
        }

        const res = await fetch(`${URI}/user/guardados/${guardadoId}`, config);
        const data = await res.json();

        if (data.err) {
            setMessageState(true);
            dispatch({ type: MESSAGE, payload: data });
            return
        };


        if (data.accion === 'eliminado') {

            if (window.location.pathname.split('/')[1] === 'mi-cuenta') {
                publicUsers.guardados.docs = publicUsers.guardados.docs.filter(item => item._id.toString() !== data.data._id.toString());
                dispatch({ type: GET_PRODUCTS_USER, payload: publicUsers })
            }else{
                publicacion.guardado = !publicacion.guardado;
                dispatch({ type: GET_PRODUCT, payload: publicacion })
            }
        } else {
            publicacion.guardado = !publicacion.guardado;
            dispatch({ type: GET_PRODUCT, payload: publicacion })
        }

        dispatch({ type: MESSAGE, payload: data });

    } catch (err) { return console.log(err.message) }
}