const express = require('express');
const router = express.Router();
const{check}=require('express-validator');
const{validarInputs}=require('../middleware/validarInputs')


const {getArticulos,getArticulo,crearArticulo,actualizarArticulo,eliminarArticulo,getArticuloBusqueda} = require('../controllers/apicontrollers')



router.get('/', getArticulos)

 
router.get('/search/?',getArticuloBusqueda)


router.get('/:id',getArticulo)      


router.post('/',crearArticulo)           


router.put('/:id',actualizarArticulo)


router.delete('/:id', eliminarArticulo) 




module.exports = router;