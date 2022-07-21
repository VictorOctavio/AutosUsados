import React from 'react'
import './card.css'

//UseNavigation
import { useNavigate } from 'react-router-dom';

//Icons card
import { AiFillCar, AiFillCalendar } from 'react-icons/ai';
import { GiCartwheel, GiLever } from 'react-icons/gi';
import {FaMotorcycle} from 'react-icons/fa';

function Card({ producto, recomendacion }) {

    const navigate = useNavigate();

    const itemOverlay = (icon, type) => (
        <div className='overlayItem'>
            {icon} <span className='type'>{producto.informacion[type] || '-'} {type === 'kilometros' && 'KM'}</span>
        </div>
    )   

    const onClickRecomendacion = (id) => {
        navigate(`/publicacion/${id}`);
        window.scrollTo(0, 0);
    }

    return (
        <div className='cardAuto'
            style={recomendacion ? { width: '16rem', height: '350px', cursor: 'pointer' } : { width: '100%', height: '420px' }}
            onClick={() => { 
                recomendacion && onClickRecomendacion(producto._id)
            }}
        >
            <div className='cardAutoBody'>

                <img className='imageCard' src={producto.imagesURL[0]} alt={producto.titulo} />

                <div className='cardAutoOverlay'>
                    {itemOverlay(producto.carroceria === 'auto' ? <AiFillCar className='iconOverlay' />:<FaMotorcycle className='iconOverlay'/>, 'carroceria')}
                    {itemOverlay(<GiCartwheel className='iconOverlay' />, 'kilometros')}
                    {itemOverlay(<GiLever className='iconOverlay' />, 'transmision')}
                    {itemOverlay(<AiFillCalendar className='iconOverlay' />, 'modelo')}
                </div>
            </div>

            <div className='cardAutoFooter'
                style={recomendacion ? { height: 'calc(350px - 260px)' } : { height: 'calc(420px - 260px)' }}
            >
                <h6 style={recomendacion ? {width: '240px'}:{width: '280px'}} className='cardAutoTitulo' title={producto.titulo}>{producto.titulo.toUpperCase()}</h6>
                <div className='cardAutoInfo'>
                    <span className='fechaPublicacion'>Hace 3 días</span>

                    <p className='precioPublicacion'>
                        {producto.unidadPrecio !== 'peso' && 'USD'}${producto.precio}
                    </p>
                </div>
                
                {!recomendacion && <button className='btn btn-detalles' onClick={() => onClickRecomendacion(producto._id)}>Ver Detalles</button>}
            </div>
        </div>
    )

}

export default Card; 