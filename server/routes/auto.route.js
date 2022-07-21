import { Router } from "express";
import multer from 'multer';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import * as CTRL from '../controllers/auto.controller';
import {verifyToken, getToken} from '../middlewares/verifyToken';

//Inicializar router
const router = Router();

//Config Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
})

const configMulter = multer({storage}).array('images', 10);

//Rutas
router.post('/publication', configMulter, verifyToken, CTRL.createPublication);
router.get('/publication/:id', getToken, CTRL.getPublicacion);
router.get('/publications/:id?', getToken, CTRL.getPublicaciones);
router.put('/publication/:id', verifyToken, CTRL.updatePublicacion);
router.delete('/publication/:id', verifyToken, CTRL.deletePublicacion);

export default router;