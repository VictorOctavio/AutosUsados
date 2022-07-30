import React, { useEffect, useState, useRef } from 'react';
import './producto.css';
import Card from '../card/Card';

//React icons
import { BsTelephoneForwardFill, BsWhatsapp, BsHeartFill } from 'react-icons/bs'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

//Redux
import { useDispatch } from 'react-redux';
import { UPDATE_GUARDADOS_USER } from '../../redux/AppDuck';

export const recomedaciones = (title, subtitle, products) => {

    const moveScroll = (move) => {
        const divRecomendaciones = document.querySelector('.recomendacionesCard');
        if (move === 'left') {
            divRecomendaciones.scrollLeft = divRecomendaciones.scrollLeft - 2000;
        } else {
            divRecomendaciones.scrollLeft = divRecomendaciones.scrollLeft + 2000;
        }
    }

    return (
        <div className='productoRecomendacion'>
            <h3 className='recomendacionTitle'>{title}</h3>
            <h6 className='text-muted'>{subtitle}</h6>
            <div className='recomendacionesCard'>
                {products.length > 0 ? (
                    products.map(((product, i) => (
                        <div key={i}>
                            <Card
                                producto={product}
                                recomendacion={true}
                            />
                        </div>
                    )))
                ) : (
                    'No hay publicaciones relacionadas'
                )}
            </div>

            {products.length > 2 && (
                <React.Fragment>
                    <button className='productoRecomendacionArrow left'>
                        <IoIosArrowBack className='productoRecomendacionArrowItem' onClick={() => moveScroll('left')} />
                    </button>
                    <button className='productoRecomendacionArrow right' onClick={() => moveScroll('right')}>
                        <IoIosArrowForward className='productoRecomendacionArrowItem' />
                    </button>
                </React.Fragment>
            )}

        </div>
    )
}

function Producto2({ producto }) {

    // State
    const [imgActive, setImgActive] = useState(producto.imagesURL[0]);
    const dispatch = useDispatch();
    let heartIcon = useRef(null);

    const scr = () => {
        const divInformacion = document.querySelector('#divInfo');
        if (divInformacion) {
            if (window.scrollY < 1230) divInformacion.classList.remove('active');
            if (window.scrollY > 1230) divInformacion.classList.add('active');
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scr, true);
    }, [])

    const createMarkup = () => ({ __html: producto.descripcion });

    const handleGuardarPublicación = () => {
        dispatch(UPDATE_GUARDADOS_USER(producto._id))
        if (producto.guardado) heartIcon.querySelector('.guardarPublicacionItem').style.color = "rgba(255, 255, 255, 0.342)";
        else heartIcon.querySelector('.guardarPublicacionItem').style.color = '#fff';
    }

    return (
        <div className='producto'>
            <div className='productoWrapper'>

                <div className='productoMuesta'>
                    <div className='productoImage'>
                        <img className='productoImageIMG' src={imgActive} alt="producto" />
                    </div>

                    <div className='productoImages'>
                        {producto.imagesURL.map((image, i) => (
                            <img key={i} className='productoImageIMG' src={image} alt="producto" onMouseOver={() => setImgActive(image)} />
                        ))}
                    </div>
                </div>

                <div className='productoInformacion' id='divInfo'>

                    <div className='productoInformacionHeader'>
                        <h2 className='productoInformacionTitle'>{producto.titulo.toUpperCase()}</h2>
                        <h6 className='productoInformacionSubTitle'>{producto.informacion.marca.toUpperCase()}</h6>
                    </div>

                    <div className='productoInformacionFooter'>
                        <div className='productoInformacionDescripcion'>
                            <h3 className='descripcionTitle'>Descripción</h3>
                            <div className='productoInformacionDescripcionContent'>
                                {producto.descripcion.length <= 3 ? 'El usuario no incluyó descripción.' : <div dangerouslySetInnerHTML={createMarkup()}></div>}
                            </div>
                        </div>

                        <div className='productoInformacionContacto'>
                            <span className='productoPrecio'>
                                {producto.unidadPrecio !== 'peso' && 'USD'} ${producto.precio}
                                <b className='productoUnidad'>Costo expresado en {producto.unidadPrecio}</b>
                                <p className='mb-0 mt-1 p-1' style={{ fontSize: '18px' }}><BsTelephoneForwardFill /> 3794256314</p>
                            </span>

                            <div className='contactoEnlaces'>
                                <a href={`https://api.whatsapp.com/send?phone=54${producto.user.telefono}&text=¿Sigue%20Disponible%20${producto.titulo}?`} target='_black' className='btn-lg btn btn-success'>
                                    <BsWhatsapp className='mb-1' /> Contactar
                                </a>
                                <div onClick={handleGuardarPublicación} className='guardarPublicacion' title='Guardar Publicación' ref={el => heartIcon = el}>
                                    <BsHeartFill className='guardarPublicacionItem'
                                        style={producto.guardado ? { color: '#fff' } : { color: 'rgba(255, 255, 255, 0.342)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='productoInformacionBody'>
                        <table className='table'>
                            <thead>
                                <tr className='bg-dark' style={{ color: '#fff' }}>
                                    <th scope="col">{producto.tipoPublicacion === 'accesorio' ? 'Accesorio' : 'Carrocería'}</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">{producto.tipoPublicacion === 'accesorio' ? 'Marca' : 'Kilometros'}</th>
                                    <th scope="col">{producto.tipoPublicacion === 'accesorio' ? 'Color' : 'Transmisión'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{producto.informacion.carroceria || '-'}</td>
                                    <td>{producto.informacion.modelo || '-'}</td>
                                    <td>{producto.tipoPublicacion === 'accesorio' ? producto.informacion.marca : producto.informacion.kilometros || '-'}</td>
                                    <td>{producto.tipoPublicacion === 'accesorio' ? producto.informacion.color : producto.informacion.transmision || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

            <div className='productoRecomendacionContainer'>
                {recomedaciones('Mas del mismo precio', '', producto.relacionados[0])}
            </div>

            <div className='productoRecomendacionContainer' style={{ marginTop: '50px' }}>
                {recomedaciones('Recomendado para ti', `Porque viste estilo ${producto.informacion.carroceria.toUpperCase() || '-'}`, producto.relacionados[1])}
            </div>

        </div>
    );
}

export default Producto2;