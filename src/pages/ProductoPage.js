import React, { useEffect } from 'react';

//Components
import Footer from '../components/footer/Footer';
import Producto from '../components/producto/Producto';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { GET_PUBLICATION_ACTION } from '../redux/AppDuck';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export default function ProductoPage() {

    //Redux
    const dispatch = useDispatch();
    const { id } = useParams();

    // UseEFFECT
    useEffect(() => {
        dispatch(GET_PUBLICATION_ACTION(id))
    }, [dispatch, id])

    const producto = useSelector(store => store.app.product) || null;
    const loading = useSelector(store => store.app.loading);

    return (
        <React.Fragment>
            {loading && (
                <div style={{ minHeight: '54vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner style={{ marginTop: '100px', }} animation='grow' variant='primary' />
                </div>
            )}

            {
                !loading && (
                    producto === null ? (
                        <div className='noResults'>
                            <h6 className='display-6 text-center'>No se encontró Publicación</h6>
                            <Link to="/publicaciones/all" className='btn btn-primary'>Ver otra publicaciones</Link>
                        </div>
                    ) : (
                        <Producto producto={producto} />
                    )
                )
            }
            <Footer />
        </React.Fragment>
    )
}