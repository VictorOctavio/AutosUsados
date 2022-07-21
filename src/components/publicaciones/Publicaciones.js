import React, { useRef, useState, useEffect } from 'react';
import './publicaciones.css'
import Card from '../card/Card';

import { filtroData2, filtroDataAuto, filtroDataMoto } from './filtroData';

//ReactRouterDom
import { useNavigate, Link, useParams } from 'react-router-dom';

//REACT BOOTSTRAP
import { Dropdown, Spinner } from 'react-bootstrap';

//React icons
import { MdKeyboardArrowRight } from 'react-icons/md'
import { RiArrowGoBackFill, RiSearch2Line, RiBarChartHorizontalFill } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai';

//Scroll infinito
import InfiniteScroll from 'react-infinite-scroll-component'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { GET_PUBLICATIONS_ACTION } from '../../redux/AppDuck';


function Publicaciones() {

    const [subMenu, setSubMenu] = useState(filtroData2[0]);
    const [filtrosShow, setFiltrosShow] = useState(true);
    const publicaciones = useSelector(store => store.app.products) || null;
    const loading = useSelector(store => store.app.loading)
    const [filtrosQueryActive, setFiltrosQueryActive] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = new URL(window.location.href);
    const { id } = useParams();

    useEffect(() => {
        dispatch(GET_PUBLICATIONS_ACTION(id, search, false))
    }, [dispatch, id, search])

    // Efecto submenu active
    let subMenuResult = useRef(null);

    const activeSubmenuFiltro = (i, filtro) => {
        if (subMenuResult.classList.contains('active')) subMenuResult.classList.remove('active');
        else {
            setSubMenu(filtro[i]);
            subMenuResult.classList.add('active');
        }
    }

    //Search filtro 
    const searchFiltro = (filterName, filter) => {
        if (filterName !== 'departamento') {
            let url = new URL(window.location.href);
            if (url.searchParams.getAll(filter.search).length > 0) url.searchParams.set(filter.search, filter.value);
            else url.searchParams.append(filter.search, filter.value);

            navigate(`${url.pathname}${url.search}`);

            //Agregar nuevo filtro a listado de filtros query
            const include = filtrosQueryActive.find(item => item.name === filter.search) || null;
            if (!include) setFiltrosQueryActive([...filtrosQueryActive, { name: filter.search, title: filter.title }])
            else {
                const arrayFilter = filtrosQueryActive.map(item => item.name === filter.search ? item = { name: filter.search, title: filter.title } : item);
                setFiltrosQueryActive(arrayFilter)
            }

        } else navigate(`/publicaciones/${filter.value}`);

        if (subMenuResult.classList.contains('active')) subMenuResult.classList.remove('active');
    }

    const handleRemoveQuery = (filter) => {
        let url = new URL(window.location.href);
        url.searchParams.delete(filter.name);
        const arrayFilter = filtrosQueryActive.filter(item => item.name !== filter.name);
        setFiltrosQueryActive(arrayFilter);
        navigate(`${url.pathname}${url.search}`);
    }

    const fetchMoreData = () => {
        if (publicaciones.hasNextPage) {
            let url = new URL(window.location.href);
            if (url.searchParams.getAll('page').length > 0) url.searchParams('page', publicaciones.page + 1);
            else url.searchParams.append('page', publicaciones.page + 1);
            let moreDataScroll = true;
            dispatch(GET_PUBLICATIONS_ACTION(id, url.search, moreDataScroll));
        }
    };

    return (
        <div className='publicaciones'>
            <div className='publicacionesWrapper'>

                <div className='publicacionesMenu'>

                    <div className='publicacionesMenuWrapper'>
                        <h6 className='publicacionesTitle'>Ayudanos a encontrar tu Vehiculo</h6>

                        <form className='filtroPrecio'>
                            <input className='input-filter' type="number" placeholder='min' />
                            <input className='input-filter' type="number" placeholder='max' />
                            <button className='btn btn-dark btn-sm'><RiSearch2Line /></button>
                        </form>

                        <div className='filtrosActive'>
                            {filtrosQueryActive.map((item, i) => (
                                <div key={i} className='filtrosActiveItem'>{item.title}<AiOutlineClose onClick={() => handleRemoveQuery(item)} className='filtrosActiveItemIcon' /></div>
                            ))}
                        </div>

                        <button className='btnResultVolver mobileFiltro mb-3' onClick={() => setFiltrosShow(!filtrosShow)}><RiBarChartHorizontalFill /> Opciones Filtrado</button>

                        <div className='itemsFiltro' style={filtrosShow ? { display: 'block' } : { display: 'none' }}>

                            {id === 'all' ? (
                                filtroData2.map((item, i) => (
                                    <div className='itemFiltro' onClick={() => activeSubmenuFiltro(i, filtroData2)} key={i}>
                                        {item.name}
                                        <MdKeyboardArrowRight className='itemFiltroIcon' />
                                    </div>
                                ))) : (

                                id === 'auto' ? (
                                    filtroDataAuto.map((item, i) => (
                                        <div className='itemFiltro' onClick={() => activeSubmenuFiltro(i, filtroDataAuto)} key={i}>
                                            {item.name}
                                            <MdKeyboardArrowRight className='itemFiltroIcon' />
                                        </div>
                                    ))) : (
                                    filtroDataMoto.map((item, i) => (
                                        <div className='itemFiltro' onClick={() => activeSubmenuFiltro(i, filtroDataMoto)} key={i}>
                                            {item.name}
                                            <MdKeyboardArrowRight className='itemFiltroIcon' />
                                        </div>
                                    )))
                            )}



                            <div className='resultFiltro' ref={el => subMenuResult = el}>
                                <button className='btnResultVolver' onClick={activeSubmenuFiltro}>
                                    <RiArrowGoBackFill />Volver
                                </button>

                                {subMenu.items.map((item, i) => (
                                    <span onClick={() => searchFiltro(subMenu.name, item)} className='itemFiltro result' key={i}>{item.title}</span>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>


                <div className='publicaionesMuesta'>

                    <div className='publicacionesFiltros'>
                        {publicaciones && (publicaciones.totalDocs)} publicaciones encontradas.
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">Filtrar</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => searchFiltro('sort', { search: "sort", value: '-createdAt' })}>Recientes</Dropdown.Item>
                                <Dropdown.Item onClick={() => searchFiltro('sort', { search: "sort", value: '-precio' })}>Mayor a Menor precio</Dropdown.Item>
                                <Dropdown.Item onClick={() => searchFiltro('sort', { search: "sort", value: 'precio' })}>Menor Mayor a precio</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    {
                        loading ? (
                            <div style={{ minHeight: '54vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Spinner style={{ marginTop: '100px', }} animation='grow' variant='primary' />
                            </div>
                        ) : (
                            publicaciones && (
                                publicaciones.docs.length > 0 ? (
                                    <InfiniteScroll
                                        className='publicacionesItems'
                                        dataLength={publicaciones.docs.length}
                                        next={fetchMoreData}
                                        hasMore={true}
                                        loader={publicaciones.hasNextPage && <Spinner style={{ marginTop: '100px', }} animation='grow' variant='primary' />}
                                    >
                                        {publicaciones.docs.map(publicacion => (
                                            <div key={publicacion._id} className="divCard">
                                                <Card
                                                    recomendacion={false}
                                                    producto={publicacion}
                                                />
                                            </div>
                                        ))}
                                    </InfiniteScroll>
                                ) : (
                                    <div className='noResults'>
                                        <h6 className='display-6 text-center'>No se encontraron Publicaciones</h6>
                                        <Link to="/" className='btn btn-primary'>Ver otra publicaciones</Link>
                                    </div>
                                )
                            )
                        )
                    }

                </div>

            </div >
        </div >
    );
}

export default Publicaciones;