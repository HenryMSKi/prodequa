import UsuarioModel from "../models/UserModel.js";
import bcrypt from "bcrypt"
import tokenhelper from "../middleware/tokenhelper.js";

const auth = () => {

}

auth.validarCredenciales = (req, res) => {

    if (!req.body.correoUsuario) {
        res.status(404).json({
            message: "Debe ingresar datos",
            content: ""
        });
    } else {
        UsuarioModel.getUserByID(req.body.correoUsuario, (err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Error al traer la data de usuarios",
                    content: ""
                })
            } else {
                if(data.length === 0) {
                    res.status(500).json({
                        message: "No existe ese usuario",
                        content: ""
                    })
                }else{
                    if (bcrypt.compareSync(req.body.passwordUsuario, data[0].passwordUsuario)){
                        
                        const tokenFirmado = tokenhelper.obtenerTokenFirmado(data[0])

                        res.status(200).json({
                            message: "Usuario encontrado",
                            content: data,
                            token: tokenFirmado
                        })
                    }else{
                        res.status(500).json({
                            message: "Clave Incorrecta",
                            content: ""
                        })
                    }
                }
            }
        })
    }
}

export default auth;