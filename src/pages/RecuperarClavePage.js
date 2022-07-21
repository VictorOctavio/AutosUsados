import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { URI } from '../Config'

export default function RecuperarClavePage({ setActiveNavbar }) {

  setActiveNavbar(false)

  const [data, setData] = useState({ password: '', confirm: 'a' });
  const [err, setErr] = useState({ err: false, message: '', color: 'text-danger' })
  const params = useParams();
  const navigate = useNavigate();
  
  const onSubmitClave = async (e) => {
    e.preventDefault();

    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': params.id
      },
      body: JSON.stringify(data)
    }
    const res = await fetch(`${URI}/recuperar-clave/confirm`, config);
    const resData = await res.json();

    if (resData.err || (data.password !== data.confirm)) {
      return setErr({ err: true, message: resData.message, color: 'text-danger' })
    }

    setErr({ err: true, message: resData.message, color: 'text-success' })

    setTimeout(() => {
      setActiveNavbar(true)
      navigate('/ingresar');
    }, 3000)
  }


  const onChangeData = e => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className='confirmarCuenta' style={{ backgroundImage: 'linear-gradient(to right, #0f0c29, #302b63, #24243e) ', height: '100vh' }}>
      <div className='confirmarCuentaWrapper'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
      >

        <Form onSubmit={onSubmitClave} style={{ minWidth: '400px', boxShadow: '0px 4px 18px -3px rgba(0, 0, 0)', padding: '30px' }}>
          <h3 className='mb-3 text-light'>Recuperar Clave</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ color: 'tomato' }}>Nueva Clave</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter email" onChange={onChangeData} />
            <Form.Text className="text-muted">Opte siempre por una clave segura.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ color: 'tomato' }}>Confirmar Nueva Clave</Form.Label>
            <Form.Control name="confirm" type="password" placeholder="Password" onChange={onChangeData} />
          </Form.Group>

          <Button variant="light" type="submit">Actualizar</Button>

          {err.err && <Form.Text className={`d-block mt-3 ${err.color}`} style={{ color: 'chirsmon', fontSize: '16px' }}>{err.message}</Form.Text>}
        </Form>

      </div>
    </div>
  )
}
