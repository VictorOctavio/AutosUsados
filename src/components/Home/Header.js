import React, { useState } from 'react'
import './header.css';

import { data } from './headerData';

import { Carousel } from 'react-bootstrap';

export default function Header() {

    const [categoria, setCategoria] = useState(data[0]);

    const images = [
        'https://res.cloudinary.com/dyntggmrp/image/upload/v1646144739/autosUsados/family2_bhyuxp.png',
        'https://res.cloudinary.com/dyntggmrp/image/upload/v1646144745/autosUsados/famify1_r8a1lv.png'
    ]



    return (
        <div className='header'>
            <div className='headerWrapper'>
                <div className='headerImage'>
                    <Carousel className='carouselContainer'>
                        {images.map((item, i) => (
                            <Carousel.Item key={i}>
                                <img className='headerImageIMG' src={item} alt={item} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className='headerBoxContainer'>
                    <div className='headerBox'>
                        <div className='headerBoxTitle'>Ayudanos a buscar tu vehículo</div>

                        <div className='headerFiltrosAyuda'>
                            <div className='categoriasVehiculos'>
                                <button className='btnCategoriaVehiculo' onClick={() => setCategoria(data[0])}>Autos</button>
                                <button className='btnCategoriaVehiculo' onClick={() => setCategoria(data[1])}>Motos</button>
                                <ul className='listaVehiculos'>
                                    {categoria.map(cat => (
                                        <li className='itemVehiculo' key={cat.categoria} title={cat.categoria}>
                                            <img className='imageVehiculo' src={cat.iconSVG} alt={cat.categoria} />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='filtroPrecioMax'>
                                <label className='labelMaxPrice'>filtrar hasta maximo</label>
                                <input className='form-control' placeholder='Precio Maximo' type='number' />
                                <button className='btn btn-warning'>Buscar</button>
                            </div>
                        </div>


                        <button className='btn '
                            style={{ width: '100%', backgroundColor: 'darkblue', color: 'white' }}
                        >Ver ultimas publicaciones</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
