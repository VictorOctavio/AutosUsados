import { Router } from 'express';
import * as CTRL from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';
import multer from 'multer';
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

//Config Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
})
const configMulter = multer({storage}).single('image');

router.post('/register', CTRL.createUser);
router.post('/login', CTRL.loginUser);
router.get('/verify-email', verifyToken, CTRL.validarEmail);
router.put('/user', verifyToken, CTRL.updateDataUser);
router.put('/user/avatar', verifyToken, configMulter, CTRL.updateAvatarUser);
router.put('/user/guardados/:id', verifyToken, CTRL.updateGuardadosUser);


//Validar token correcto
router.get('/verify-token', verifyToken, CTRL.validateToken);

//Publicaiones
router.get('/publicaciones/user', verifyToken, CTRL.getPublicacionesUser);
router.put('/publicacion/user/edit/:id', verifyToken, CTRL.updatePublicacionesUser);
router.delete('/publicacion/user/delete/:id', verifyToken, CTRL.deletePublicacionesUser);

// Recuperar clave
router.post('/recuperar-clave', CTRL.recuperarClave);
router.put('/recuperar-clave/confirm', verifyToken, CTRL.confrimRecuperarClave);

export default router;