import './login.css'

import SVG from '../../assets/svgLogin.svg';

export default function Login({
    data, setLogin, login, setForgetPassword, forgetPassword, onChangeForm, onSubmit, submitRecuperarClave, resMessage, userState
}) {

    const inputLogin = (name, type) => (
        <div className='inputDiv'>
            <label className='labelInputDiv'>{name}</label>
            <input autoComplete='off' onChange={onChangeForm} type={type} name={name} value={data[name]} className='input-' />
        </div>
    )


    return (
        <div className='login'>
            <div className='loginWrapper'>
                {!forgetPassword ? (
                    <div className='loginForm'>
                        <h6 className='titleSaludo'>Bienvenido a usedmotor</h6>
                        <form className='formLogin' onSubmit={onSubmit}>
                            <h6 className='loginFormTitle'>
                                {login ? 'Iniciar Sesión' : 'Registrate'}
                            </h6>

                            {!login && inputLogin('nombre', 'text')}
                            {inputLogin('email', 'email')}
                            {inputLogin('contraseña', 'password')}

                            <button className='btn mt-2' style={{ backgroundColor: ' rgb(11, 1, 22)', color: '#fff'}} disabled={userState.loading}>
                                {login ? 'Ingresar' : 'Registrarme'}
                            </button>

                            {login && <span className='forget' onClick={() => setForgetPassword(true)}>¿Olvidaste clave?</span>}
                            <span className='changeInicio' onClick={() => setLogin(!login)}>
                                {login ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                            </span>

                        </form>
                    </div>
                ) : (
                    <div className='loginForm' onSubmit={submitRecuperarClave}>
                        <form className='formLogin'>
                            <h6 className='loginFormTitle'>Recuperar Clave</h6>
                            {inputLogin('email', 'email')}
                            <button className='btn mt-2' style={{ backgroundColor: ' rgb(11, 1, 22)', color: '#fff' }}>Recuperar</button>

                            <span className='changeInicio' onClick={() => setForgetPassword(false)}>Volver atras</span>

                        </form>
                    </div>
                )}
                <div className='loginImage'>
                    <img src={SVG} alt="svg login usedmotor" className='image' />
                    <span className='resMessage' style={{ backgroundColor: resMessage.color, color: login ? '#fff': '#000' }}>{resMessage.message}</span>
                </div>

            </div>
        </div>
    )
}
