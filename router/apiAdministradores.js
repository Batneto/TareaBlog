const express = require('express');
const router = express.Router();
const{check}=require('express-validator');
const{validarInputs}=require('../middleware/validarInputs')

const {getAdmin,crearAdmin,loginAdmin,renew} = require('../controllers/administradoresControllers')



router.get('/',getAdmin)

router.get('/renew',renew)

router.post('/new',[
    check('usuario','Falta el usuario').not().isEmpty(),
    check('pass','falta la pass').not().isEmpty(),
    validarInputs],
    crearAdmin)

router.post('/',[
    check('usuario','Falta el usuario').not().isEmpty(),
    check('pass','falta la pass').not().isEmpty(),
    validarInputs],
    loginAdmin)


module.exports = router;