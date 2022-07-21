import React, { useState, useRef } from 'react';
import './publicacionesuser.css';

//Moment JS español
import moment from 'moment'
import 'moment/locale/es'

//React Iconst
import { HiArrowLeft } from 'react-icons/hi'

//ReactQuill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//React Bootstrap
import { Spinner } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';

// REDUX
import { UPDATE_PUBLICATION_USER, DELETE_PUBLICATION_USER } from '../../../redux/AppDuck';
import { useSelector, useDispatch } from 'react-redux';

function PublicacionesUser({ publicationsUser }) {

    const dispatch = useDispatch()
    const loading = useSelector(store => store.app.loading);
    const message = useSelector(store => store.app.message)

    let divEdit = useRef(null)
    let divWrapper = useRef(null);
    const [publicaciones, setPublicaciones] = useState(publicationsUser);


    const [publicacion, setPublicacion] = useState({
        _id: publicaciones.docs[0]._id,
        titulo: publicaciones.docs[0].titulo,
        precio: publicaciones.docs[0].precio,
        unidadPrecio: publicaciones.docs[0].unidadPrecio
    })

    // Descripcion
    const [descripcion, setDescripcion] = useState({ text: publicaciones.docs[0].descripcion })
    const onChangeDescripcion = value => setDescripcion({ text: value });
    const onChangeEdit = (e) => setPublicacion({ ...publicacion, [e.target.name]: e.target.value })

    const changeEditItem = (item) => {
        if (item._id === publicacion._id) {
            divEdit.classList.remove('active');
            divWrapper.classList.remove('active');
            setPublicacion({ _id: '' })
        } else {
            setPublicacion({
                _id: item._id,
                titulo: item.titulo,
                precio: item.precio,
                kilometros: item.informacion.kilometros,
                unidadPrecio: item.unidadPrecio
            })
            setDescripcion({ text: item.descripcion });
            divWrapper.classList.add('active');
            divEdit.classList.add('active');
        }
    }

    // ELIMINAR
    const deleteItem = product => {
        const confirm = window.confirm(`Seguro que quieres eliminaar ${product.titulo}`);
        if (confirm) {

            divEdit.classList.remove('active');
            divWrapper.classList.remove('active');
            setPublicacion({ _id: '' })

            dispatch(DELETE_PUBLICATION_USER(product._id));

            if (!message.err) {
                const publics = publicaciones.docs.filter(item => item._id !== product._id)
                setPublicaciones({ ...publicaciones, docs: publics });
            }
        }
    }

    // EDITAR PUBLICACIÓN
    const onSumbitEdit = (e) => {
        e.preventDefault();
        publicacion.descripcion = descripcion.text;
        dispatch(UPDATE_PUBLICATION_USER(publicacion));
    }

    const Columns = [
        { field: 'titulo', headerName: 'Titulo', width: 350 },
        { field: 'precio', headerName: 'Precio', width: 120, renderCell: (item) => `$ ${item.row.precio}` },
        {
            field: 'createdAt', headerName: 'Publicación', width: 150, renderCell: (item) => {
                return moment(item.row.createdAt).format('L')
            }
        },
        {
            field: 'action', headerName: 'Action', width: 200, renderCell: (item) => {
                return (
                    <li style={{ listStyle: 'none' }}>
                        <button
                            style={item.row._id === publicacion._id ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: 'rgb(255, 187, 0)' }}
                            className='btn btn-sm mx-2' onClick={() => changeEditItem(item.row)}>Editar</button>
                        <button className='btn btn-sm btn-danger' onClick={() => deleteItem(item.row)}>Eliminar</button>
                    </li>
                )
            }
        }
    ];

    return (
        <div className='publicacionesUser'>
            <div className='publicacionesUserWrapper active' ref={el => divWrapper = el}>

                <div className='publicacionesUserList' style={{ height: "85vh", width: "100%" }}>
                    <div className='display-6 mt-5 mb-3'>LISTADO PUBLICACIONES</div>
                    {
                        publicaciones.docs.length > 0 ? (
                            <DataGrid
                                columns={Columns}
                                rows={publicaciones.docs}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                getRowId={(e) => e._id}
                            />

                        ) : 'NO HAY PUBLICACIONES'}
                </div>

                <form className='publicacionUserEdit active' onSubmit={onSumbitEdit} ref={el => divEdit = el}>
                    <h4 className='publicacionEditTitle'>
                        <HiArrowLeft className='backMobile' onClick={() => {
                            divEdit.classList.remove('active');
                            setPublicacion({ _id: '' })
                        }} />
                        Editar Publicación
                    </h4>
                    <div className='publicacionEditInput'>
                        <label className='publicacionEditLabel'>Titulo</label>
                        <input className='form-control' type="text" value={publicacion.titulo} name="titulo" onChange={onChangeEdit} />
                    </div>

                    <div className='publicacionEditInput'>
                        <label className='publicacionEditLabel'>Precio</label>
                        <input className='form-control' type="number" value={publicacion.precio} name="precio" onChange={onChangeEdit} />
                    </div>

                    <div className='publicacionEditInput'>
                        <label className='publicacionEditLabel'>Moneda Cobro</label>
                        <select className='form-select' name="unidadPrecio" value={publicacion.unidadPrecio} onChange={onChangeEdit}>
                            <option>peso</option><option>dolar</option>
                        </select>
                    </div>

                    <div className='publicacionEditInput'>
                        <label className='publicacionEditLabel'>Descripcion</label>
                        <ReactQuill value={descripcion.text} onChange={onChangeDescripcion} style={{ height: '300px', width: '100%', backgroundColor: '#fff' }} />
                    </div>

                    <button className='btn mt-5' style={{ background: 'tomato', color: '#fff' }} disabled={loading}>
                        {loading && <Spinner className='mx-2' animation="border" variant="secondary" size="sm" />}
                        Editar Publicación
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PublicacionesUser;
