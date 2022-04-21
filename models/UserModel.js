import db from "../config/bd.js";
import bcrypt from "bcrypt";

const Usuarios = function(usuarios) {
    this.idUsuario = usuarios.idUsuario;
    this.nombreUsuario = usuarios.nombreUsuario;
    this.correoUsuario = usuarios.correoUsuario;
    this.apellidoUsuario = usuarios.apellidoUsuario;
    this.passwordUsuario = usuarios.passwordUsuario;
    this.idRol = usuarios.idRol;
    this.codigocambioClave = usuarios.codigocambioClave;
    this.created_at = usuarios.created_at;
    this.updated_at = usuarios.updated_at;
    this.deleted_at = usuarios.deleted_at;
    this.idEstadousuario = usuarios.idEstadousuario;
}

Usuarios.create = (newUser, result) => {
    const saltRounds = 10;
    const contraseniaHash = bcrypt.hashSync(newUser.passwordUsuario, saltRounds);
    //bcrypt.compareSync(myPlaintextPassword, hash); // true

    db.query(`INSERT INTO tblUsuario VALUES (null, 
                                            '${newUser.nombreUsuario}', 
                                            '${newUser.correoUsuario}', 
                                            '${newUser.apellidoUsuario}', 
                                            '${contraseniaHash}', 
                                            '${newUser.idRol}',
                                            null,
                                            '${newUser.created_at}',
                                            null,
                                            null,
                                            1)`, (err, res) => {
        if(err){
            console.log(err);
            result(err, null);
            return;
        }else{
            console.log("Se inserto un usuario")
            result(null, {
                nombreUsuario: newUser.nombreUsuario
            });
        }
    })
}

Usuarios.getAll = (req, result) => {
    db.query(`SELECT * FROM tblUsuario`, (err, res) => {
        if(err){
            console.log("Error en el query getAll " + err);
            result(err, null);
            return;
        }else{
            console.log(res);
            result(null, res);
        }
    })
}

Usuarios.getUserByID = (correUsuario, result) => {
    db.query(`SELECT * FROM tblUsuario WHERE correoUsuario = '${correUsuario}'`, (err, res) => {
        if (err) {
            console.log("Error en el query getUserByID " + err);
            result(err, null);
            return;
        } else {
            console.log("Se obtuvo el usuario" + res);
            result(null, res);
        }
    })
}

Usuarios.updateUserByID = (usuario, result) => {
    const saltRounds = 10;
    const contraseniaHash = bcrypt.hashSync(usuario.passwordUsuario, saltRounds);

    db.query(`UPDATE tblUsuario set nombreUsuario = '${usuario.nombreUsuario}',
                                    correoUsuario = '${usuario.correoUsuario}',
                                    apellidoUsuario = '${usuario.apellidoUsuario}',
                                    passwordUsuario = '${contraseniaHash}',
                                    idRol = ${usuario.idRol},
                                    updated_at = '${usuario.updated_at}',
                                    idEstadousuario = ${usuario.idEstadousuario} 
    WHERE idUsuario = ${usuario.idUsuario}`, (err, res) =>{
        if (err) {
            console.log("Error en el query updateUserByID " + err);
            result(err, null);
            return;
        } else {
            console.log("Se actualizo el usuario" + res);
            result(null, res);
        }
    })
}

Usuarios.deleteUserByID = (id, result) =>{
    db.query(`DELETE FROM tblUsuario WHERE idUsuario = ${id}`, (err, res) =>{
        if (err) {
            console.log("Error en el query deleteUserByID " + err);
            result(err, null);
            return;
        } else {
            console.log("Se elimino el usuario" + res);
            result(null, res);
        }
    })
}

export default Usuarios;