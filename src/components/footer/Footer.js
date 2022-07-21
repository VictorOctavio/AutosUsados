import React from 'react'
import './footer.css';

//React icons
import { FaInstagramSquare, FaFacebookSquare, FaGithubSquare, FaTwitterSquare } from 'react-icons/fa'

//Data footer
import { footerDataContact, footerDataNavegacion, footerDataMarcas } from './footerData';
import {FiSend} from 'react-icons/fi'
export default function Footer() {

    const redSocialIcon = (icon) => (
        <a href='/' className='footerRedSocial'>
            {icon}
        </a>
    )

    const listFooterBody = (data) => (
        <ul className='listFooter'>
            <h6 className='footerListTitle'>{data.title}</h6>
            {data.navegation.map((item, i) => (
                <li className='itemListFooter' key={i}>{item}</li>
            ))}
        </ul>
    )

    return (
        <div className='footer'>
            <div className='footerWrapper'>
                <div className='footerHeader'>
                    <h6 className='footerHeaderTitle'>USEDMOTOR</h6>
                    <div className='footerRedes'>
                        {redSocialIcon(<FaInstagramSquare />)}
                        {redSocialIcon(<FaFacebookSquare />)}
                        {redSocialIcon(<FaTwitterSquare />)}
                        {redSocialIcon(<FaGithubSquare />)}
                    </div>
                </div>

                <div className='footerBody'>
                    {listFooterBody(footerDataNavegacion)}
                    {listFooterBody(footerDataMarcas)}
                    {listFooterBody(footerDataContact)}

                    <form className='formSub'>
                        <h6 className='footerListTitle'>Subscribirse</h6>
                        <input type="email" placeholder="Email" className='form-control inputSub'/>
                        <button className='btn btn-dark btn-sub'><FiSend/></button>
                    </form>
                </div>

                <div className='footerFooter'>Todos derechos reservados -GvO-</div>
            </div>
        </div>
    )
}
