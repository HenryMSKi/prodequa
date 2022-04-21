import jwt from "jsonwebtoken";
import dotenv from 'dotenv/config';

const fechaActual = new Date();
const fechaActualSplit = fechaActual.getFullYear() + '-' +
    fechaActual.getMonth() + '-' +
    fechaActual.getDate() + ' ' +
    fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();

const hoy = Date.now();


const tokenhelper = () => {

};

tokenhelper.verificarToken = (req, res, next) => {
    /* console.log(req.header('Authorization')); */
    const bearerHeader = req.header('Authorization');
    
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ');

        const bearerToken = token[1];
        

        jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, dataToken) => {
            /* const tokenDa = jwt.decode(bearerToken, process.env.JWT_SECRET_KEY)

            console.log("Este es el tokenDa: " + tokenDa); */
        })

        next();
    }else{
        res.status(401).json({
            message: 'No se envió token',
        })
    }
}

tokenhelper.obtenerTokenFirmado = (Usuario) => {
    const payload = {
        User:Usuario,
        iat:hoy, 
        exp: 86400
    };

    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

export default tokenhelper;