import React, { useState, useRef } from 'react';
import './Informacionuser.css';

import imgAvatar from '../../../assets/bebito.jpg'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateDataUserAction, UPDATE_AVATAR_USER } from '../../../redux/UserDuck';

function InformacionUser({ informacion }) {

    let btnChangeAvatar = useRef(null);
    const dispatch = useDispatch();
    const loading = useSelector(store => store.user.loading);

    const [updateInfo, setUpdateInfo] = useState(informacion);
    const [image, setImage] = useState(null);
    const [imageActive, setImageActive] = useState(informacion.avatar || imgAvatar);

    //Input div
    const inputDiv = (content, label) => (
        <div className='informacionDataUserDivInput'>
            <label className='informacionDataUserLabel'>{label}</label>
            <input className='informacionDataUserinput' type="text" value={updateInfo[content]} placeholder={content} name={content} onChange={onChangeInfo} />
        </div>
    )

    // ChangeInfoUpdate && new Image
    const onChangeInfo = e => setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    const onChangeImage = e => {
        setImage(e.target.files);
        btnChangeAvatar.classList.remove('d-none');
    };

    const onSumbitUpdateData = e => {
        e.preventDefault();
        dispatch(updateDataUserAction(updateInfo));
    }

    //Update avatar
    const onSubmitUpdateAvatar = (e) => {
        e.preventDefault();
        dispatch(UPDATE_AVATAR_USER(image, setImageActive));
        btnChangeAvatar.classList.add('d-none');
    }

    return (
        <div className='informacionUser'>
            <div className='informacionUserWrapper'>

                <div className='informacionDataUser'>

                    <div className='informacionDataUserImgContainer'>
                        <img className='informacionDataUserImg' src={imageActive} alt='avatarUser' />
                        <form onSubmit={onSubmitUpdateAvatar} className='informacionDataUserImgForm'>
                            <input name='image' onChange={onChangeImage} title='cambiar avatar' type="file" className='inputUpdateAvatar' />
                            <button className='btn btn-dark btn-sm d-none' ref={el => btnChangeAvatar = el}>Cambiar</button>
                        </form>
                    </div>
                    <form className='informacionDataUserForm' onSubmit={onSumbitUpdateData}>

                        {inputDiv('telefono', 'Telefono / Celular')}
                        {inputDiv('whatsapp', 'Whatsapp')}
                        {inputDiv('correoElectronico', 'Correo Contacto')}
                        {inputDiv('residencia', 'Ubicación')}
                        <button className='btn btn-light' disabled={loading}>Actualizar Datos</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default InformacionUser;
