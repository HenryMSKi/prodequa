import UsuarioModel from "../models/UserModel.js";

const fechaActual = new Date();
const fechaActualSplit = fechaActual.getFullYear() + '-' +
    fechaActual.getMonth() + '-' +
    fechaActual.getDate() + ' ' +
    fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();

const us = () => {
}

us.create = (req, res) => {

    if(!req.body){
        res.status(404).json({
            message: "No se puede realizar la solicitud",
            content: ""
        })
    }

    const Usuario = new UsuarioModel({
        idUsuario : "null",
        nombreUsuario : req.body.nombreUsuario,
        correoUsuario : req.body.correoUsuario,
        apellidoUsuario : req.body.apellidoUsuario,
        passwordUsuario : req.body.passwordUsuario,
        idRol : req.body.idRol,
        codigocambioClave : "null",
        created_at : fechaActualSplit,
        updated_at : "null",
        deleted_at : "null",
        idEstadousuario : 1
        })

    UsuarioModel.create(Usuario, (err, data) => {
        if(err){
            res.status(404).json({
                message: "No se pudo crear al usuario",
                content: ""
            });
        }else{
            res.status(201).json({
                message: "Usuario registrado exitosamente",
                content: ""
            });
        }
    })
}

us.getAll = (req, res) => {
    UsuarioModel.getAll(req, (err, data) => {
        if(err)
        {
            res.status(500).json({
            message: "Error al traer la data de usuarios",
            content: ""
            })
        }else{
            res.status(200).json({
                message: "Usuarios encontrados",
                content: data
            })
        }
    })
}

us.updateUserByID = (req, res) => {

    if (!req.body) {
        res.status(404).json({
            message: "No se envió data para actualizar",
            content: ""
        })
    }

    const Usu = new UsuarioModel({
        idUsuario: req.params.id,
        nombreUsuario: req.body.nombreUsuario,
        correoUsuario: req.body.correoUsuario,
        apellidoUsuario: req.body.apellidoUsuario,
        passwordUsuario: req.body.passwordUsuario,
        idRol: req.body.idRol,
        codigocambioClave: "",
        created_at: "",
        updated_at: fechaActualSplit,
        deleted_at: "",
        idEstadousuario: req.body.idEstadousuario
    })

    UsuarioModel.updateUserByID(Usu, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "No se pudo actualizar al usuario",
                content: ""
            })
        } else {
            res.status(200).json({
                message: "Usuarios actualizado",
                content: data
            })
        }
    })
}

us.deleteUserByID = (req, res) => {
    if(!req.params.id){
        res.status(404).json({
            message: "No se envió un ID valido",
            content: ""
        })
    }

    UsuarioModel.deleteUserByID(req.params.id, (err, data) =>{
        if (err) {
            res.status(500).json({
                message: "No se pudo eliminar al usuario",
                content: ""
            })
        } else {
            res.status(200).json({
                message: "Usuarios eliminado exitosamente",
                content: []
            })
        }
    })
}

export default us ;