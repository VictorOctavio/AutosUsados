import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//Components
import NavbarContainer from "./components/navbar/NavbarContainer";
import ScrollTop from './components/ScrollTop';
import { ToastMessage } from './components/toast/ToastMessage';

//Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductoPage from './pages/ProductoPage';
import PublicacionesPage from './pages/PublicacionesPage';
import UserAdminPage from './pages/UserAdminPage';
import ConfirmCuentaPage from './pages/ConfirmCuentaPage';
import RecuperarClavePage from './pages/RecuperarClavePage';

// redux
import { useSelector } from 'react-redux';
const App = () => {

  const session = useSelector(store => store.user.session);
  const token = localStorage.getItem('token');

  const [activeNavbar, setActiveNavbar] = useState(true);

  return (
    <Router>
      <ScrollTop/>
      <ToastMessage />

      {activeNavbar && <NavbarContainer />}
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/ingresar" element={!session ? <LoginPage /> : <Navigate to="/publicaciones/all" />} />
        <Route path="/publicacion/:id" element={<ProductoPage />} />
        <Route path="/publicaciones/:id" element={<PublicacionesPage />} />
        <Route path="/mi-cuenta/*" element={token ? <UserAdminPage setActiveNavbar={setActiveNavbar} /> : <Navigate to="/ingresar" />} />

        {/* AUXS */}
        <Route path="/confirmar-cuenta/:id" element={<ConfirmCuentaPage setActiveNavbar={setActiveNavbar} />} />
        <Route path="/recuperar-cuenta/:id" element={<RecuperarClavePage setActiveNavbar={setActiveNavbar} />} />
        
        {/*REDIRECTS  */}
        <Route path={`/publicacion`} element={<Navigate to="/publicaciones/all" />} />
        <Route path={`/publicaciones`} element={<Navigate to="/publicaciones/all" />} />
      
      </Routes>
    </Router>
  );
}


export default App;