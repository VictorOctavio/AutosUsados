import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

//ReactQuill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//React Bootstrap
import { Spinner } from 'react-bootstrap';

// DATA FORM
import { dataFormInput } from '../adminData';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { NEW_PUBLICACION_ACTION } from '../../../redux/AppDuck';

function NewPublicationForm({
    publicacion, setPublicacion, setImages, images, descripcion, setDescripcion
}) {


    let formDiv = useRef(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(store => store.app.loading);

    //Capturar data publicacion
    const changeDataPublicacion = (e) => setPublicacion({ ...publicacion, [e.target.name]: e.target.value });

    //Reset valores default por tipo carroceria
    const changeTipoPublicacion = e => {
        if (e.target.value === 'auto') setPublicacion({ ...publicacion, carroceria: 'sedan', tipoPublicacion: e.target.value });
        if (e.target.value === 'moto') setPublicacion({ ...publicacion, carroceria: '110', tipoPublicacion: e.target.value });
        if (e.target.value === 'accesorio') setPublicacion({ ...publicacion, carroceria: 'autoparte', tipoPublicacion: e.target.value });
    }

    //Capturar imagenes publicacion
    const changeImagesPublicacion = (e) => setImages(e.target.files);

    //Capturar descripcion REACTQUILL
    const onChangeDescripcion = value => setDescripcion({ text: value });

    //Submit nueva publicacion
    const onSubmitPublicacion = (e) => {
        e.preventDefault();

        dispatch(NEW_PUBLICACION_ACTION(publicacion, images, descripcion));

        //Limpiar card muestra y form
        // setPublicacion({
        //     tipoPublicacion: 'auto',
        //     titulo: '',
        //     precio: 0,
        //     descripcion: '',
        //     color: '',
        //     kilometros: 0,
        //     modelo: 0,
        //     marca: '',
        //     unidadPrecio: 'peso',
        //     transmision: 'automatico',
        //     carroceria: 'sedan'
        // })
        console.log(formDiv)
        // formDiv.reset();
    }

    return (
        <form className='formNewPublicacion' onSubmit={onSubmitPublicacion} ref={el => formDiv = el}>

            <label className='labelForInput'>Tipo de publicación</label>
            <select className='form-select bg-dark' style={{ color: '#fff' }} name='tipoPublicacion' onChange={changeTipoPublicacion}>
                <option>auto</option><option>moto</option><option>accesorio</option>
            </select>

            {dataFormInput.inputss(publicacion.tipoPublicacion).map((item, i) => (
                <input autoComplete='off' className='form-control' type={item.type} name={item.name} placeholder={item.placeHolder} key={i}
                    style={{ width: item.width || '100%', padding: '0px 5px', display: item.display || 'block'  }}
                    onChange={changeDataPublicacion}
                    maxlength="50"
                />
            ))}

            <select className='form-select' style={{ padding: '0px 5px' }} name="carroceria" onChange={changeDataPublicacion}>
                {dataFormInput[publicacion.tipoPublicacion].map(item => (
                    <option key={item}>{item}</option>
                ))}
            </select>

            {dataFormInput.selectss(publicacion.tipoPublicacion).map((item, i) => (
                <select name={item.name} style={{ padding: '0px 5px', display: item.display || 'block' }} className='form-select' key={i} onChange={changeDataPublicacion}>
                    {item.items.map(opcion => <option key={opcion}>{opcion}</option>)}
                </select>
            ))}

            <ReactQuill value={descripcion.text} onChange={onChangeDescripcion} style={{ height: '180px', width: '100%' }} />

            <div className='mt-5' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <label className='labelForInput'>Máximo hasta 10 imagenes</label>
                <input className='mt-2' type="file" name="images" onChange={changeImagesPublicacion} multiple />
            </div>


            <button className='btn btn-dark py-2' disabled={loading}>
                {loading && <Spinner className='mx-2' animation="border" variant="secondary" size="sm" />}
                Crear Publicación
            </button>
            <label style={{ width: '100%' }} className='labelForConfirmacion' >
                IMPORTANTE: Los datos de comunicación (telefono, ubicacion, whatsapp) se mantendran los de la configuracion actual, para actualizarlos puede ir  a la
                <b style={{ cursor: 'pointer' }} onClick={() => navigate('/mi-cuenta/informacion')}> configuración de información de la cuenta.</b>
            </label>
        </form>
    );
}

export default NewPublicationForm;
