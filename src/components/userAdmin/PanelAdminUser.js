import React from 'react';
import './adminuser.css';

//React Router Dom
import { useNavigate } from 'react-router-dom';

//React Icons
import { HiArrowCircleLeft } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import { BiImageAdd } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { MdOutlineImageSearch } from 'react-icons/md'

function PanelAdminUser({ setActiveNavbar }) {

    //navigate
    const navigate = useNavigate();

    const backPanelControl = () => {
        setActiveNavbar(true);
        navigate('/');
    }

    const panelItem = (title, icon, redirect) => (
        <div className='panelControlItem' onClick={() => navigate(redirect)}>
            <div className='d-flex justify-content-center align-items-center'>
                {icon}
                <span className='panelControlItemText mx-1'>{title}</span>
            </div>
            <FiArrowRight className='panelControlItemIcon' />
        </div>
    )

    return (
        <div className='panelUser'>
            <button className='panelControlBack' onClick={backPanelControl}>
                <HiArrowCircleLeft className='panelControlBackItem' />
                <span className='panelControlBackText'>Volver</span>
            </button>

            <div className='panelControlItems'>
                {panelItem('mensajes', <MdOutlineImageSearch className='panelControlItemIconTheme' />, '/mi-cuenta/mensajes')}
                {panelItem('Publicar', <BiImageAdd className='panelControlItemIconTheme' />, '/mi-cuenta')}
                {panelItem('publicaciones', <BsImages className='panelControlItemIconTheme' />, '/mi-cuenta/publicaciones')}
                {panelItem('guardados', <MdOutlineImageSearch className='panelControlItemIconTheme' />, '/mi-cuenta/guardados')}
                {panelItem('información', <MdOutlineImageSearch className='panelControlItemIconTheme' />, '/mi-cuenta/informacion')}
            </div>

        </div>
    );
}

export default PanelAdminUser;
