import React, { useState } from 'react'
import Login from './Login';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAccion, registerUserAccion, recuperarClaveAction } from '../../redux/UserDuck';

export default function LoginContainer() {

    //Estados
    const [data, setData] = useState({ email: '', contraseña: '', nombre: '' });
    const [login, setLogin] = useState(true);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [resMessage, setResMessage] = useState({ message: 'Hola!', color: 'transparent', err: true })

    //Redux
    const dispatch = useDispatch();
    const userState = useSelector(store => store.user)

    //Capturar Inputs
    const onChangeForm = (e) => setData({ ...data, [e.target.name]: e.target.value })


    //Enviar form
    const onSubmit = (e) => {
        e.preventDefault();

        //Validar campos Requeridos
        if (!data.email.trim() || !data.contraseña.trim() || (!login && !data.nombre.trim())) {
            return setResMessage({ message: 'Campos Requeridos', color: "red", err: true });
        }

        // Registro o ingreso
        if (login) dispatch(loginUserAccion(data, setResMessage));
        else dispatch(registerUserAccion(data, setResMessage));

        if (!resMessage.err) {
            // Limpiar forms
            setData({ email: '', contraseña: '' });
        }
    }


    const submitRecuperarClave = (e) => {
        e.preventDefault();
        if (forgetPassword) console.log('Registro de: ', data.email);

        dispatch(recuperarClaveAction(data, setResMessage));

        if (!resMessage.err) {
            // Limpiar forms
            setData({ email: '', contraseña: '' });
        }
    }

    return (
        <Login
            data={data}
            login={login}
            setLogin={setLogin}
            setForgetPassword={setForgetPassword}
            forgetPassword={forgetPassword}
            onChangeForm={onChangeForm}
            onSubmit={onSubmit}
            submitRecuperarClave={submitRecuperarClave}
            resMessage={resMessage}
            userState={userState}
        />
    )
}
