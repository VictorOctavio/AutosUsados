import React, { useState } from 'react';
import './savepublicaciones.css';

// Redux
import { useDispatch } from 'react-redux'
import { UPDATE_GUARDADOS_USER } from '../../../redux/AppDuck';
import { Link, useNavigate } from 'react-router-dom';

//React Icons
import {GrNext, GrPrevious} from 'react-icons/gr'

function SavePublicaciones({ publicationsUser }) {

  const [publicaciones, setPublicaciones] = useState(publicationsUser.guardados)
  const [divActive, setDivActive] = useState({ idActive: -1, active: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageState, setMessageState] = useState(true);

  const deleteSave = (id) => {
    dispatch(UPDATE_GUARDADOS_USER(id, setMessageState));
    if (!messageState) {
      const arrayFilter = publicaciones.docs.filter(item => item._id !== id);
      setPublicaciones({ ...publicaciones, docs: arrayFilter });
    }
  }

  console.log(publicaciones)

  return (
    <div className="savePublicaciones">
      <div className='savePublicacionesWrapper'>
        <div className='savePublicacionesTitle'>
          Guardados
          <div className='savePublicacionesNavegation'>
            <button className='btn btn-dark btm-sm p-1' disabled={!publicaciones.prevPage}><GrPrevious className='savePublicacionesNavegationIcon'/></button>  
            <button className='btn btn-dark btm-sm p-1' disabled={!publicaciones.nextPage}><GrNext className='savePublicacionesNavegationIcon'/></button>  
          </div>
        </div>
        <div className='savePubliacacionesList'>
          {publicaciones.docs.length > 0 ? (
            publicaciones.docs.map((item, i) => (
              <div className='savePublicacionItem'
                onMouseEnter={() => setDivActive({ idActive: i, active: false })}
                onMouseLeave={() => setDivActive({ idActive: '', active: false })}
              >
                <img className='savePublicacionItemImg' src={item.imagesURL[0]} alt='titulo' />

                <div className={i === divActive.idActive ? 'savePublicacionContent active' : 'savePublicacionContent'}>
                  <h6 className='savePublicacionContentTitle'>{item.titulo}</h6>
                  <div>
                    <button className='btn btn-light btn-sm' onClick={()=>navigate(`/publicacion/${item._id}`)}>ver</button>
                    <button className='btn btn-danger btn-sm mx-1' onClick={() => deleteSave(item._id)}>eliminar</button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className='noResults'>
              <h6 className='display-6 text-center'>No guardaste Publicaciones</h6>
              <Link to="/publicaciones/all" className='btn btn-primary'>Ver otras publicaciones</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavePublicaciones;
