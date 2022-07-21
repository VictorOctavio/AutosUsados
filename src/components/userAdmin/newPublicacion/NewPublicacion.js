import React, { useState, useRef } from 'react';
import './newpublicacion.css';

//Data
import { dataFormInput } from '../adminData';

//React Bootstrap
import { Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';

//REACT ICONS
import { VscUnverified, VscVerified } from 'react-icons/vsc';
import { BiImageAlt } from 'react-icons/bi';
import { MdOutlineHideImage } from 'react-icons/md'

//Form new Publicacion
import NewPublicationForm from './NewPublicationForm';


function NewPublicacion() {

    let btnViewCard = useRef(null);

    //States
    const [imageViewCard, setImageViewCard] = useState(<BiImageAlt className='viewCardMobileIcon' />)
    const [images, setImages] = useState([]);
    const [descripcion, setDescripcion] = useState({ text: 'Descripción' });
    const [publicacion, setPublicacion] = useState({
        tipoPublicacion: 'auto',
        titulo: '',
        precio: 0,
        descripcion: '',
        color: '',
        kilometros: 0,
        modelo: 0,
        marca: '',
        unidadPrecio: 'peso',
        transmision: 'automatico',
        carroceria: 'sedan'
    })

    const itemsCard = ['carroceria', 'marca', 'color', 'transmision', 'modelo', 'kilometros', 'unidadPrecio'];
    const itemsCardAccesorio = ['carroceria', 'marca', 'color', 'unidadPrecio'];

    const [modalActive, setModalActive] = useState(false);


    //View/Show card in mobile
    const onClickViewCardMobile = () => {
        if (btnViewCard.classList.contains("active")) {
            btnViewCard.classList.remove('active');
            setImageViewCard(<BiImageAlt className='viewCardMobileIcon' />);
        } else {
            btnViewCard.classList.add('active');
            setImageViewCard(<MdOutlineHideImage className='viewCardMobileIcon' />);
        }
    }

    //Pintar descripcion
    const createMarkup = () => ({ __html: descripcion.text });

    return (
        <div className='newpublicacion'>

            <h4 className='formNewPublicacionTitle'>Crear Nueva Publicación
                <b className='consejos' onClick={() => setModalActive(!modalActive)}>consejos/ejemplo</b>
                <Modal show={modalActive} onHide={() => setModalActive(false)} fullscreen={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Consejos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Modal body content</Modal.Body>
                </Modal>
            </h4>

            <div className='newpublicacionWrapper'>

                <NewPublicationForm
                    publicacion={publicacion}
                    setPublicacion={setPublicacion}
                    setImages={setImages}
                    images={images}
                    descripcion={descripcion}
                    setDescripcion={setDescripcion}
                />

                <button className='viewCardMobile' onClick={onClickViewCardMobile}>{imageViewCard}</button>

                <div className='VistaNewPublicacion' ref={el => btnViewCard = el}>
                    <Card style={{ width: '100%', boder: '1px solid #Ccc' }} bg="dark" text="white">
                        <div className='vistaNewPublicacionImage'>
                            {publicacion.tipoPublicacion === 'auto' && <Card.Img style={{ height: '250px', objectFit: 'cover' }} variant="top" src={dataFormInput.imagesCard[0]} />}
                            {publicacion.tipoPublicacion === 'moto' && <Card.Img style={{ height: '250px', objectFit: 'cover' }} variant="top" src={dataFormInput.imagesCard[1]} />}
                            {publicacion.tipoPublicacion === 'accesorio' && <Card.Img style={{ height: '250px', objectFit: 'cover' }} variant="top" src={dataFormInput.imagesCard[2]} />}
                            <div className='overlayImageCard'><b className='overlayImageCardText'>Publicar {publicacion.tipoPublicacion}</b></div>
                        </div>

                        <Card.Body>
                            <Card.Title>{publicacion.titulo || 'Titulo Publicacion'}</Card.Title>
                            <Card.Subtitle>$ {publicacion.precio || '0'}</Card.Subtitle>
                            <Card.Text style={{
                                border: '1px solid rgb(58, 58, 58)', overflow: 'auto', marginTop: '12px', padding: '10px 5px',
                                height: publicacion.tipoPublicacion === 'accesorio' ? '310px' : '190px'
                            }}>
                                <div dangerouslySetInnerHTML={createMarkup()}></div>
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {(publicacion.tipoPublicacion === 'accesorio' ? itemsCardAccesorio : itemsCard).map(item => (
                                <ListGroupItem key={item} style={{ background: 'inherit', color: "#fff", width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {item}: {publicacion[item]}
                                        {typeof publicacion[item] === 'string' && !publicacion[item].trim() ? (<VscUnverified style={{ color: 'red', fontSize: '25px' }} />)
                                            : (<VscVerified style={{ color: 'green', fontSize: '25px' }} />
                                            )}
                                    </div>
                                </ListGroupItem>
                            ))}
                            <ListGroupItem style={{ background: 'inherit', color: "#fff", width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Imagenes: {images.length}
                                    {!images.length > 0 ? (<VscUnverified style={{ color: 'red', fontSize: '25px' }} />)
                                        : (<VscVerified style={{ color: 'green', fontSize: '25px' }} />
                                        )}
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </div>
            </div>

        </div >
    )
}

export default NewPublicacion;
