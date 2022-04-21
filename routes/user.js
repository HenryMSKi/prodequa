import express, {json} from "express";

const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({
        message: 'Solicitud exitosa',
        content: 'Usuarios BD'
    });
}).post('/user', (req, res) => {
    const data = req.body;

    console.log(data);

    res.status(200).json({
        message: 'Solicitud exitosa',
        content: 'Usuarios a agregar',
    })
})

export default router;