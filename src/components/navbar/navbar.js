import React, { useRef } from 'react';
import './navbar.css';
import { useNavigate, NavLink } from 'react-router-dom';

//Iconst
import { FaSignInAlt, FaSearch, FaMotorcycle } from 'react-icons/fa'
import { AiFillCar, AiFillCaretDown, AiOutlineClose, AiOutlineArrowLeft } from 'react-icons/ai';
import { GiFullMotorcycleHelmet } from 'react-icons/gi'
import { IoIosArrowForward } from 'react-icons/io'
import { GoThreeBars } from 'react-icons/go';
import { Dropdown } from 'react-bootstrap';

export default function Navbar({
    gridData, changeStateGrid, changeSearch, search, handleSubmitSearch, esMobile, onGridRemove, onGridActive, grid, setGrid, gridMobileActive, changeStateGridMobile, removeAllSubMenu, setNavEnlacesMobile, navEnlacesMobile, user
}) {
    const navigate = useNavigate();

    //Ref del menu subactagoria (usado en mobile)
    let subCategoriaDiv = useRef(null);

    //Enlaces nav menu
    const enlace = (nombre, icon) => <NavLink to={`/${nombre}`} onClick={() => setGrid(false)} className="enlacesLink"> {icon} {nombre}</NavLink>;

    // Enlace de categoria/departamentos
    const enlaceCategoria = (nombre, icon, state) => (
        <li className="gridCategoriasItem" onMouseOver={() => changeStateGrid(state)} onClick={() => changeStateGridMobile(state, subCategoriaDiv)}>
            <div className='itemLeft'>{icon}{nombre}</div>
            <IoIosArrowForward className='arrowItem' />
        </li>
    );

    console.log(gridData)

    //Enlace de marcas de los deparamentos
    const enlaceMarca = (nombre) => <NavLink key={nombre} onClick={() => setGrid(false)} className="marcaItem" 
    to={`/publicaciones/${gridData.title}?${gridData.title==='accesorio'?'carroceria':'marca'}=${nombre}`}>
    {nombre}</NavLink>

    // Boton de regresar en menu mobile
    const btnRegresar = (setCloset) => <button className='btn btn-light m-2 btn-sm btn-regresar' onClick={() => setCloset(false)}> <AiOutlineArrowLeft /> Regresar</button>

    // Buscardor mobile y de pc
    const searchDiv = (clase) => (
        <div className={clase}>
            <form onSubmit={handleSubmitSearch}>
                <input placeholder='Buscar por Marca, Modelo, etc' value={search} className='form-control' onChange={changeSearch} />
                <button className='btn btn-search'><FaSearch style={{ color: 'rgb(141, 141, 141)' }} /></button>
            </form>
        </div>
    )

    // Style nuevos mensajes notificaciones
    const contMessageStyle = {
        position: 'absolute', 
        right: '5%', 
        width: '25px', 
        height: '25px',
        backgroundColor: 'red',
        color: '#fff',
        borderRadius: '50%'
    }

    return (
        <nav className="navbar" onMouseLeave={onGridRemove}>
            <div className="navbarWrapper">

                <div className='BtnMobile'>
                    <GoThreeBars className='BtnMobileIcon' onClick={() => setNavEnlacesMobile(true)} />
                    {navEnlacesMobile && <AiOutlineClose className='BtnMobileIcon' onClick={() => removeAllSubMenu(subCategoriaDiv)} />}
                </div>

                <div className={navEnlacesMobile ? 'contenedorEnlaces active' : 'contenedorEnlaces'}>
                    {btnRegresar(setNavEnlacesMobile)}

                    <a className='logotipo' href="/" onMouseOver={onGridActive} onClick={gridMobileActive}>USEDMOTOR <span className='logotiposCategorias'>ver departamentos<AiFillCaretDown className='logotiposCategoriasIcon' /></span></a>

                    <div className="enlaces">
                        {searchDiv('contenedorSearch2')}
                        {enlace('publicaciones', <AiFillCar />)}
                        {!user.session ? enlace('ingresar', <FaSignInAlt />) : (
                            <Dropdown >
                                <Dropdown.Toggle className='enlacesLink' variant="inherit" id="dropdown-basic">cuenta</Dropdown.Toggle>

                                <Dropdown.Menu style={{width: '100%'}}>
                                    <Dropdown.Item onClick={()=> navigate('/mi-cuenta')}>Mi Cuenta</Dropdown.Item>

                                    <Dropdown.Item onClick={()=> navigate('/mi-cuenta/mensajes')}>
                                        Mensajes <span style={contMessageStyle}>+1</span>
                                    </Dropdown.Item>

                                    <Dropdown.Item onClick={()=> { localStorage.removeItem('token');
                                        return window.location.replace('/ingresar');
                                    }}>Salir</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                </div>

                <div className='prueba'>

                    <div className='gridContainer' style={grid ? { display: 'grid' } : { display: 'none' }}>
                        <div className='grid'>

                            <div className='gridCategorias'>
                                {btnRegresar(setGrid)}
                                <div className='gridCategoriasTitle'>Departamentos</div>
                                <ul className='gridCategoriasItems'>
                                    {enlaceCategoria(`Autos`, <AiFillCar className='gridCategoriasItemIcon' />, 0)}
                                    {enlaceCategoria('Motos', <FaMotorcycle className='gridCategoriasItemIcon' />, 1)}
                                    {enlaceCategoria('Accesorios', <GiFullMotorcycleHelmet className='gridCategoriasItemIcon' />, 2)}
                                </ul>
                            </div>

                            <div className='gridSubCategorias' ref={el => subCategoriaDiv = el}>
                                {esMobile && (
                                    <button className='btn btn-light m-2 btn-sm btn-regresar' onClick={() => subCategoriaDiv.classList.remove('active')}> <AiOutlineArrowLeft /> Regresar</button>
                                )}
                                <div className='gridCategoriasTitle'>Marcas Demandadas</div>
                                <ul className='subCategoriaMarcas'>
                                    {gridData.marcas.map(item => enlaceMarca(item))}
                                </ul>
                            </div>

                            <div className='gridGaleria'>
                                {gridData.galeria.map((item, i) => (
                                    <a key={i} className='gridGaleriaIMG' href={item.url}>
                                        <img src={item.urlImage} alt={item.url} />
                                        <div className='gridGaleriaDivImage'><h6 className='titleDivImage'>{item.title}</h6></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {searchDiv('contenedorSearch')}

                </div>

            </div>
        </nav>
    )
}
