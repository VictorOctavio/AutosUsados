import { Router } from "express";
import * as CTRL from '../controllers/admin.controller';
import {verifyModerador, verifyAdmin, verifyToken} from '../middlewares/verifyToken';

const router = Router();

router.put('/bloquear/:id', verifyToken, verifyAdmin, CTRL.bloquearUser);
router.put('/delete-publicacion/:id', verifyToken, verifyModerador, CTRL.deletePublicacion);
router.put('/asignar-roles/:id', verifyToken, verifyAdmin, CTRL.asignarRoles);
router.post('/sendMail', verifyToken, verifyModerador, CTRL.sendMailUsers);
router.get('/users', verifyToken, verifyAdmin);

export default router;