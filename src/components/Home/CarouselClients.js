import React, {useRef} from 'react'
import './carousel.css'

import { FaInstagram } from 'react-icons/fa'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

import { recomedaciones } from '../producto/Producto'

//Redux
import { useSelector } from 'react-redux'

import { usersInstagramData } from './headerData';

export default function CarouselClients() {

    const userActive = useSelector(store => store.user.session);
    const productos = useSelector(store => store.app.products)
    let divCarouselClients = useRef(null);

    const clienteDiv = (user) => (
        <div className='clienteCaroulsel'>
            <img className='clienteImage' src={user.photo} alt='cliente' />
            <span className='carouselIcon' onClick={() => window.open(`https://www.instagram.com/${user.url}`)} > <FaInstagram className='mt-1' />
                @{user.name}
            </span>
        </div>
    )

    const handleMoveCarousel = (move) => {
        if(divCarouselClients){
            if(move === 'left') divCarouselClients.scrollLeft = divCarouselClients.scrollLeft-2000;
            else divCarouselClients.scrollLeft = divCarouselClients.scrollLeft+2000;
        }
    }

    return (
        <div className='carousel'>
            <div className='carouselWrapper'>

                {productos && (
                    userActive ? (
                        <div className='carouselRecomendaciones'>
                            {recomedaciones('Recomendaciones', 'Basado en tus vistas', productos.recomendacion)}
                        </div>
                    ) : <div className='carouselRecomendaciones'>
                        {recomedaciones('Recientes', 'Ultimas publicaciones subidas', productos.recomendacion)}
                    </div>
                )}


                <div className='carouselClient'>
                  
                    <div className='carouselTitle'>Ser feliz sin complicaciones 
                        <a rel="noreferrer" href='https://www.instagram.com/explore/tags/newcar/' target="_blank" className='hashtag'>#NEWCAR</a>
                    </div>

                    <div className='clientesCaroulsel' ref={el => divCarouselClients = el}>
                        {usersInstagramData.map((user, i) => <div key={i}>{clienteDiv(user)}</div>)}
                    </div>

                    <button className='carouselClientArrow left'>
                        <IoIosArrowBack className='carouselClientArrowItem' onClick={()=>handleMoveCarousel('left')}/>
                    </button>
                    <button className='carouselClientArrow right'>
                        <IoIosArrowForward className='carouselClientArrowItem' onClick={()=>handleMoveCarousel('right')}/>
                    </button>
                </div>

            </div>
        </div>
    )
}
