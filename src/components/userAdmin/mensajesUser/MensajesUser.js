import React, {useRef} from 'react';
import './mensajesuser.css';

import bebito from '../../../assets/bebito.jpg'

//ReactIcons 
import { FiSend } from 'react-icons/fi'
import { HiArrowLeft } from 'react-icons/hi';

function MensajesUser() {

    let divChatActiveMobile = useRef(null);
    const message = 'Que onda bro como estas, queria preguntarte si el ariticulo sigue disponible'

    const activeChatMobile = () => {
        if(divChatActiveMobile.classList.contains('active')){
            divChatActiveMobile.classList.remove('active')
        }else{
            divChatActiveMobile.classList.add('active')
        }
    }

    const divInformacionUser = (textColor, backMobile) => (
        <div className='userInformacionMessage'>
            {backMobile && <HiArrowLeft className='backMobile' onClick={activeChatMobile}/>}
            <img className='userInformacionMessageIMG' src={bebito} alt='avartar' />
            <h6 className='mb-0' style={{ color: textColor }}>Martín Lugo</h6>
        </div>
    )

    return (
        <div className='messagesUser'>
            <div className='messagesUserWrapper'>

                <div className='chatActive' ref={el => divChatActiveMobile = el}>
                    <div className='chatActiveHeader'>
                        {divInformacionUser('#fff', true)}
                    </div>

                    <div className='chatActiveBody'>

                        <div className='chatSended'>
                            <div className='chatSendedContent'>
                                <p className='chatSendedContentP'>{message}</p>
                                <span  className='horaMessage'>12:47</span>
                            </div>
                        </div>

                        <div className='chatRecived'>
                            <div className='chatRecivedContent'>
                                <p className='chatSendedContentP'>Todo bien, si el precio es de $11000</p>
                                <span className='horaMessage'>12:49</span>
                            </div>
                        </div>

                    </div>

                    <div className='chatActiveFooter'>
                        <input type="text" placeholder='Nuevo Mensaje: ' className='inputSendMessageChat' />
                        <button className='SendMessageChatBtn'><FiSend className='SendMessageChatIcon' /></button>
                    </div>
                </div>

                <div className='messagesList'>
                    <h6 className='messagesListTitlte'>Chat Recientes</h6>
                    <ul className='messagesListUsers'>
                        <li className='messageListUser' onClick={activeChatMobile}>
                            {divInformacionUser('#000', false)}
                            <div className='messageListTexto'>
                                <p className='texto'>{message}</p>
                                <span className='hours'>3 days</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default MensajesUser;
