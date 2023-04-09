const {validationResult}=require('express-validator') //* devuelve una array con los errores si no hay array vacio 



const validarInputs=(req,res,next)=>{

    const errors=validationResult(req)
    
    if(errors.isEmpty()){
      next()
    }else{ return res.status(404).json({
            ok:false,
            msg:'Error al obtener los servicios',
            errores:errors.mapped()
    })
}
      
}


module.exports={
    validarInputs
}