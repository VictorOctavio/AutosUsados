import React, { useState } from 'react'
import Navbar from './navbar'

import { navbarData } from './navbardata';

//Redux
import {useSelector} from 'react-redux';

import { useNavigate } from 'react-router-dom';

export default function NavbarContainer() {

    const navigate = useNavigate();
    
    //Estados y constantes
    const esMobile = window.innerWidth <= 1000;

    //Grid estado imagenes y subategoria
    const [gridData, setGridData] = useState(navbarData[0]);
    const changeStateGrid = (state) => setGridData(navbarData[state])

    //Search
    const [search, setSearch] = useState('');
    const changeSearch = (e) => setSearch(e.target.value);
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        navigate(`/publicaciones/${search}`);
    }
 
    
    //Grid en PC efecto onMouseLeave
    const [grid, setGrid] = useState(false);
    const onGridActive = () => !esMobile && setGrid(true);
    const onGridRemove = () => !esMobile && setGrid(false);    

    // Activar GRID en mobile efector click
    const gridMobileActive = (e) => {
        if (esMobile) {
            setGrid(true);
            e.preventDefault();
        }
    }
    

    //State grid departamentos Mobile 
    const [navEnlacesMobile, setNavEnlacesMobile] = useState(false);


    //Grid Subcategroria state
    const changeStateGridMobile = (state, subCategoriaDiv) => {
        if (esMobile) {
            changeStateGrid(state);
            subCategoriaDiv.classList.add('active');
        }
    }

    //Remover todos submenu mobile X
    const removeAllSubMenu = (subCategoriaDiv) => {
        subCategoriaDiv.classList.remove('active');
        setGrid(false);
        setNavEnlacesMobile(false);
    }


    // SESSION
    const user = useSelector(store => store.user);
    return (
        <Navbar
            gridData={gridData}
            changeStateGrid={changeStateGrid}
            search={search}
            changeSearch={changeSearch}
            esMobile={esMobile}
            handleSubmitSearch={handleSubmitSearch}
            onGridRemove={onGridRemove}
            onGridActive={onGridActive}
            grid={grid}
            setGrid={setGrid}
            gridMobileActive={gridMobileActive}
            changeStateGridMobile={changeStateGridMobile}
            removeAllSubMenu={removeAllSubMenu}
            setNavEnlacesMobile={setNavEnlacesMobile}
            navEnlacesMobile={navEnlacesMobile}
            user={user}
        />
    )
}
