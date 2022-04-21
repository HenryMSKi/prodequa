import express from "express";
import UsuariosController from "../controllers/UsuarioController.js"
import ValidarCredencialesController from "../controllers/ValidarCredencialesController.js"
import tokenhelper from "../middleware/tokenhelper.js";

const router = express.Router();

router.get('/', tokenhelper.verificarToken, UsuariosController.getAll).post('/', tokenhelper.verificarToken, UsuariosController.create).put('/:id', tokenhelper.verificarToken, UsuariosController.updateUserByID).delete('/:id', tokenhelper.verificarToken, UsuariosController.deleteUserByID);
router.post('/auth', ValidarCredencialesController.validarCredenciales)

export default router;