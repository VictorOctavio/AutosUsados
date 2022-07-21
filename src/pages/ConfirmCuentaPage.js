import React, { useState } from 'react';

//ReactRouterDom
import { useParams, useNavigate } from 'react-router-dom';

// React-Bootstrap
import { Card, Spinner } from 'react-bootstrap';
import { URI } from '../Config';

function ConfirmCuentaPage({ setActiveNavbar }) {

    //State
    const [messageRes, setMessageRes] = useState({ name: '', finish: false, message: '', err: false });

    setActiveNavbar(false);
    const params = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        confirmarCuenta();
    });

    const confirmarCuenta = async () => {
        const token = params.id;
        const config = {
            method: 'GET',
            headers: { 'auth-token': token },
        }
        const res = await fetch(`${URI}/verify-email`, config);
        const data = await res.json();

        if (data.err) setMessageRes({ name: data.nameUser, finish: true, err: true, message: data.message });
        else {
            setMessageRes({ name: data.nameUser, finish: true, err: false, message: data.message });
            localStorage.setItem('token',token);
        };

        setTimeout(() => {
            navigate('/publicaciones/all');
            setActiveNavbar(true);
        }, 3000)
    }

    return (
        <div className='confirmarCuenta' style={{ backgroundImage: 'linear-gradient(to right, #0f0c29, #302b63, #24243e) ', height: '100vh' }}>
            <div className='confirmarCuentaWrapper'
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
            >

                <Card text='secondary' style={{ padding: '30px 10px', background: 'inherit', border: '3px solid tomato', width: '30rem', boxShadow: '0px 4px 18px -3px rgba(0, 0, 0)' }}>
                    <Card.Header style={{ border: 'none', textAlign: 'center', fontSize: '25px', fontWeight: '900', color: '#fff' }}>
                        Confirmación de Cuenta
                    </Card.Header>

                    <Card.Body style={{ border: 'none' }}>

                    </Card.Body>

                    <Card.Footer style={{ border: 'none', display: 'flex', justifyContent: 'center' }}>
                        {messageRes.finish ? (
                            <h4 style={{ color: '#fff', fontSize: '18px' }}>Bienvenido <b style={{ color: 'tomato' }}>{messageRes.name}</b></h4>
                        ) : (
                            <Spinner animation="border" size="lg" style={{ color: 'tomato' }} />
                        )}
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}

export default ConfirmCuentaPage;
