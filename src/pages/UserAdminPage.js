import React, { useEffect } from 'react';
import '../components/userAdmin/adminuser.css';

//React Router Dom
import { Routes, Route } from 'react-router-dom';

// Comonenets
import NewPublicacion from '../components/userAdmin/newPublicacion/NewPublicacion';
import PanelAdminUser from '../components/userAdmin/PanelAdminUser';
import SavePublicaciones from '../components/userAdmin/savePublicaciones/SavePublicaciones';
import InformacionUser from '../components/userAdmin/informacionUser/InformacionUser';
import PublicacionesUser from '../components/userAdmin/publicacionesUser/PublicacionesUser';
import MensajesUser from '../components/userAdmin/mensajesUser/MensajesUser';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { GET_PUBLICATIONS_USER } from '../redux/AppDuck';



function UserAdminPage({ setActiveNavbar }) {

  setActiveNavbar(false);
  const informacion = useSelector(store => store.user.informacion);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_PUBLICATIONS_USER());
  }, [dispatch])

  const publicationsUser = useSelector(store => store.app.publicationsUser) || null;

  return (
    <div className='userAdmin'>
      <div className='userAdminWrapper'>

        <PanelAdminUser setActiveNavbar={setActiveNavbar} />

        <Routes>
          <Route path="" element={<NewPublicacion />} />
          <Route path="publicaciones" element={publicationsUser && <PublicacionesUser publicationsUser={publicationsUser} />}/>
          <Route path="guardados" element={publicationsUser && <SavePublicaciones publicationsUser={publicationsUser}/>} />
          <Route path="mensajes" element={<MensajesUser />} />
          <Route path="informacion" element={informacion !== null && <InformacionUser informacion={informacion} />} />
        </Routes>

      </div>
    </div>

  );
}

export default UserAdminPage;
